import { QRCodeSVG } from 'qrcode.react'

export default function DesktopBlocker() {
  return (
    <div className="fullscreen-page flex flex-col items-center justify-center bg-white px-8">
      <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-6">
        <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
        </svg>
      </div>
      <p className="text-lg font-serif italic text-[#222] mb-8 text-center">Open this app on mobile</p>
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <QRCodeSVG value={window.location.href} size={160} bgColor="#fff" fgColor="#222" />
      </div>
    </div>
  )
}
