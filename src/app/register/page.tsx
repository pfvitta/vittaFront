import Link from "next/link";

export default function RegisterSelector() {
  return (
    <div className="min-h-screen bg-[#E6FAF7] flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
        Get in touch with Vitta
      </h1>
      <p className="text-center text-gray-600 max-w-xl mb-8">
        Tell us how to reach you, and we’ll do the rest.
      </p>
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl">
        {/* Option 1: User */}
        <Link href="/register/user" className="flex-1 bg-white rounded-3xl p-6 shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">You’re seeking care for yourself or a loved one</h2>
          <p className="text-gray-600 mb-4">Interested in treatment? Are you a family member or friend of someone who’s struggling?</p>
          <button className="bg-teal-700 text-white px-4 py-2 rounded-xl">Get in touch</button>
        </Link>
        
        {/* Option 2: Provider */}
        <Link href="/register/provider" className="flex-1 bg-white rounded-3xl p-6 shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">You’re a provider, heath plan employee, or other professional</h2>
          <p className="text-gray-600 mb-4">Do you have a patient who needs treatment? Do you want to make a referral?</p>
          <button className="bg-teal-700 text-white px-4 py-2 rounded-xl">Get started</button>
        </Link>
      </div>
    </div>
  );
}


