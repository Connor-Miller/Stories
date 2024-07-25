import React, { useState } from 'react';

const FamilyLegacyComponent: React.FC = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Submitted email:', email);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900">
            <div className="max-w-3xl w-full p-8">
                <div className="relative">
                    <div className="bg-wood bg-cover bg-center p-6">
                        <h1 className="text-white text-2xl font-bold mb-4">OUR LEGACY</h1>
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            {[...Array(9)].map((_, index) => (
                                <div key={index} className="bg-gray-300 aspect-[3/4]"></div>
                            ))}
                        </div>
                        <h2 className="text-white text-4xl font-serif text-center mb-4">
                            Preserve & Share Family Memories
                        </h2>
                    </div>
                    <div className="bg-black bg-opacity-80 p-6">
                        <h3 className="text-white text-3xl font-serif text-center mb-4">Subscribe</h3>
                        <p className="text-gray-400 text-center mb-4">
                            Sign up to be the first to get updates.
                        </p>
                        <form onSubmit={handleSubmit} className="flex gap-4">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-grow bg-transparent border border-gray-600 text-white px-4 py-2 rounded"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-white text-black px-6 py-2 rounded font-bold"
                            >
                                SIGN UP
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FamilyLegacyComponent;