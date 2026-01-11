import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import cloudinary from 'cloudinary'

dotenv.config()

const rawArgs = process.argv.slice(2)

const stripQuotes = (value) => value.replace(/^"|"$/g, '').replace(/^'|'$/g, '')

const parseArg = (flag) => {
  const prefix = `${flag}=`
  const entry = rawArgs.find((arg) => arg.startsWith(prefix))
  if (!entry) return undefined
  return stripQuotes(entry.slice(prefix.length))
}

// Upload the local profile asset to Cloudinary using credentials stored in an .env file or passed as CLI args.

const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  PROFILE_IMAGE_PATH: envProfileImagePath,
  PROFILE_IMAGE_PUBLIC_ID: envPublicId,
  PROFILE_IMAGE_FOLDER: envFolder,
  PROFILE_IMAGE_QUALITY: envQuality,
  PROFILE_IMAGE_FORMAT: envFormat
} = process.env

const PROFILE_IMAGE_PATH =
  parseArg('--profile-image-path') ||
  envProfileImagePath ||
  'public/images/profile (2).jpg'
const PROFILE_IMAGE_PUBLIC_ID =
  parseArg('--public-id') ||
  envPublicId ||
  'dilusha_profile'
const PROFILE_IMAGE_FOLDER =
  parseArg('--folder') ||
  envFolder ||
  undefined
const PROFILE_IMAGE_QUALITY =
  parseArg('--quality') ||
  envQuality ||
  undefined
const PROFILE_IMAGE_FORMAT =
  parseArg('--format') ||
  envFormat ||
  undefined

const required = {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET
}

for (const [key, value] of Object.entries(required)) {
  if (!value) {
    console.error(`Missing required environment variable: ${key}`)
    process.exit(1)
  }
}

cloudinary.v2.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
  timeout: 120000
})

const imageAbsolutePath = path.resolve(process.cwd(), PROFILE_IMAGE_PATH)
if (!fs.existsSync(imageAbsolutePath)) {
  console.error(`Cannot find image at ${imageAbsolutePath}. Adjust PROFILE_IMAGE_PATH.`)
  process.exit(1)
}

// Auto-detect resource type based on file extension
const fileExt = path.extname(imageAbsolutePath).toLowerCase()
const isPdf = fileExt === '.pdf'
const isVideo = ['.mp4', '.mov', '.avi', '.webm', '.mkv', '.flv', '.wmv'].includes(fileExt)
const isRawFile = ['.pdf', '.doc', '.docx', '.txt', '.zip'].includes(fileExt)

let resourceType = 'image'
if (isVideo) resourceType = 'video'
else if (isRawFile) resourceType = 'raw'

const uploadOptions = {
  public_id: PROFILE_IMAGE_PUBLIC_ID,
  folder: PROFILE_IMAGE_FOLDER,
  overwrite: true,
  resource_type: resourceType,
  type: 'upload',
  access_mode: 'public',
  quality: !isPdf && !isVideo && PROFILE_IMAGE_QUALITY !== 'auto' ? PROFILE_IMAGE_QUALITY : undefined,
  format: !isPdf && !isVideo && PROFILE_IMAGE_FORMAT !== 'auto' ? PROFILE_IMAGE_FORMAT : undefined
}

Object.keys(uploadOptions).forEach((key) => {
  if (uploadOptions[key] === undefined || uploadOptions[key] === '') {
    delete uploadOptions[key]
  }
})

const displayProgressBar = (current, total) => {
  const percentage = Math.round((current / total) * 100)
  const barLength = 40
  const filledLength = Math.round((barLength * current) / total)
  const emptyLength = barLength - filledLength
  
  const bar = '█'.repeat(filledLength) + '░'.repeat(emptyLength)
  const sizeInMB = (current / (1024 * 1024)).toFixed(2)
  const totalInMB = (total / (1024 * 1024)).toFixed(2)
  
  process.stdout.write(`\rUploading: [${bar}] ${percentage}% (${sizeInMB}MB / ${totalInMB}MB)`)
}

const uploadProfileImage = async (retryCount = 0) => {
  const maxRetries = 3
  try {
    console.log('\n📤 Starting upload...\n')
    
    let uploadedBytes = 0
    let totalBytes = 0
    let lastUpdateTime = Date.now()
    let progressCallbackFired = false

    // Get file size
    const stats = fs.statSync(imageAbsolutePath)
    totalBytes = stats.size
    
    console.log(`File size: ${(totalBytes / (1024 * 1024)).toFixed(2)}MB\n`)

    // Simulate progress if callback doesn't fire (fallback)
    const progressInterval = setInterval(() => {
      if (!progressCallbackFired && uploadedBytes < totalBytes) {
        uploadedBytes = Math.min(uploadedBytes + (totalBytes * 0.1), totalBytes - 1)
        displayProgressBar(uploadedBytes, totalBytes)
      }
    }, 200)

    const result = await cloudinary.v2.uploader.upload(imageAbsolutePath, {
      ...uploadOptions,
      on_upload_progress: (progress) => {
        progressCallbackFired = true
        uploadedBytes = progress.bytes_processed
        const currentTime = Date.now()
        // Update progress bar every 100ms to avoid too frequent updates
        if (currentTime - lastUpdateTime >= 100) {
          displayProgressBar(uploadedBytes, totalBytes)
          lastUpdateTime = currentTime
        }
      }
    })

    clearInterval(progressInterval)
    displayProgressBar(totalBytes, totalBytes)


    console.log('\n\n✅ Upload successful!')
    console.log('Secure URL:', result.secure_url)
    console.log('Copy that URL into VITE_PROFILE_PHOTO_URL in your .env.local file to override the default profile image.')
  } catch (error) {
    if (retryCount < maxRetries) {
      console.log(`\n\nRetrying... (Attempt ${retryCount + 2}/${maxRetries + 1})`)
      await new Promise(resolve => setTimeout(resolve, 2000))
      return uploadProfileImage(retryCount + 1)
    }
    
    console.error('\n\nUpload failed!')
    if (error && error.message) {
      console.error('Error:', error.message)
    } else if (error && error.error) {
      console.error('Error:', error.error.message || error.error)
    } else {
      console.error('Error:', error)
    }
    process.exit(1)
  }
}

uploadProfileImage()
