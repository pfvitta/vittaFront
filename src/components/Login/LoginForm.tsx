// /pages/login.tsx
import Image from 'next/image';

export default function Login() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E6FAF7] px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <div className="flex justify-center mb-4">
            <Image src="/logo-png-vitta.png" alt="Equip logo" width={50} height={50} />
          </div>
          <h2 className="text-2xl font-semibold text-center mb-6">Log in</h2>
          <form className="space-y-4">
            <input type="email" placeholder="Email address" className="w-full px-4 py-2 border rounded-md" />
            <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded-md" />
            <button type="submit" className="w-full bg-teal-700 text-white py-2 rounded-md hover:bg-teal-800">
              Log In
            </button>
          </form>
          <div className="mt-4 text-center">
            <a href="#" className="text-teal-700 hover:underline">Reset password</a>
          </div>
          <p className="mt-6 text-center text-sm text-gray-500">
            If you need help, contact <a href="mailto:support@equip.health" className="text-teal-700 underline">support@vitta.org</a>
          </p>
          <p className="mt-2 text-center text-xs text-gray-400">Copyright © Vitta Inc. 2025</p>
        </div>
      </div>
    );
  }
  