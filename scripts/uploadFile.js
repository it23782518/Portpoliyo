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
  api_secret: CLOUDINARY_API_SECRET
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

const uploadProfileImage = async () => {
  try {
    const result = await cloudinary.v2.uploader.upload(imageAbsolutePath, uploadOptions)
    console.log('Upload successful!')
    console.log('Secure URL:', result.secure_url)
    console.log('Copy that URL into VITE_PROFILE_PHOTO_URL in your .env.local file to override the default profile image.')
  } catch (error) {
    console.error('Upload failed:', error.message)
    process.exit(1)
  }
}

uploadProfileImage()
