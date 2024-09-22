import { OAuth2Client } from 'google-auth-library'
import * as nodemailer from 'nodemailer'

import {
  API_FEEDBACK_RESPONSE_DEFAULT_FAIL,
  API_FEEDBACK_RESPONSE_DEFAULT_SUCCESS,
} from '@/src/shared/api'

import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const email = searchParams.get('email') ?? 'example@mail.com'
  const message = searchParams.get('message') ?? 'Great docs!'

  const subject = 'konspekt'
  const text = `${message}\n\n${email}`

  const oauth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  )

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  })

  const getAccessTokenResponse = await oauth2Client.getAccessToken()

  if (!getAccessTokenResponse.token) {
    return Response.json(API_FEEDBACK_RESPONSE_DEFAULT_FAIL)
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true,
    auth: {
      type: 'oauth2',
      user: process.env.EMAIL,
      accessToken: getAccessTokenResponse.token,
    },
  })

  const mail = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject,
    text,
  }

  try {
    await transporter.sendMail(mail)
  } catch {
    return Response.json(API_FEEDBACK_RESPONSE_DEFAULT_FAIL)
  }

  return Response.json(API_FEEDBACK_RESPONSE_DEFAULT_SUCCESS)
}
