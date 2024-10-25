import { useEffect, useState } from 'react';

export const About = () => {
    const [scrollY, setScrollY] = useState(0);

    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Calculate zoom scale based on scroll position
    const zoomScale = Math.max(1 - scrollY / 800, 0.9); // Adjust 800 for zoom effect distance

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1A1B1C] to-[#2C2C2C] text-white">
            {/* Main Content Wrapper */}
            <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                
                {/* Heading Section */}
                <div className="mb-12 text-center">
                    <h1 className="text-5xl font-bold text-blue-400">ABOUT SMART GUARD</h1>
                    <p className="mt-4 text-lg text-gray-400">Revolutionizing security operations with real-time tracking and incident response.</p>
                </div>
                
                {/* First Section: Description with Image */}
                <div className="flex flex-col md:flex-row items-center justify-between bg-[#2C2C2C] shadow-md rounded-lg p-8 mb-12">
                    
                    {/* Text Section */}
                    <div className="flex-grow text-left md:pr-6">
                        <h2 className="text-3xl font-semibold text-gray-100 mb-6">What is SmartGuard?</h2>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            SmartGuard is a cutting-edge real-time personnel tracking and incident response system designed to enhance security and operational efficiency. By utilizing advanced GPS technology and robust data management, SmartGuard ensures that your security personnel are always accounted for and capable of responding to incidents promptly.
                        </p>
                    </div>

                    {/* Image Section on the Right */}
                    <div className="flex-shrink-0 mb-6 md:mb-0 md:ml-6">
                        <div className="relative overflow-hidden rounded-lg shadow-lg max-w-[327px] max-h-[488px]">
                            <img
                                src="images/aboutimg3.jpg" // Replace with your image source
                                alt="SmartGuard Tracking"
                                className="w-full h-auto rounded-lg"
                                style={{
                                    transform: `scale(${zoomScale})`,
                                    transition: 'transform 0.3s ease-in-out',
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Why Choose Us Section with Image on the Left */}
                <div className="flex flex-col md:flex-row items-center justify-between bg-[#3C3C3C] shadow-md rounded-lg p-8 mb-12">
                    
                    {/* Image Section on the Left */}
                    <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-6">
                        <div className="relative overflow-hidden rounded-lg shadow-lg max-w-[327px] max-h-[488px]">
                            <img
                                src="images/aboutimg5.jpg" // Replace with your second image source
                                alt="Why Choose Us"
                                className="w-full h-auto rounded-lg"
                                style={{
                                    transform: `scale(${zoomScale})`,
                                    transition: 'transform 0.3s ease-in-out',
                                }}
                            />
                        </div>
                    </div>

                    {/* Text Section */}
                    <div className="flex-grow text-left md:pl-6">
                        <h2 className="text-3xl font-semibold text-gray-100 mb-6">Why Choose Us?</h2>
                        <ul className="list-disc list-inside text-gray-400 space-y-3 leading-relaxed">
                            <li>🔒 <strong>Real-Time Tracking:</strong> Always know the location of your personnel.</li>
                            <li>📈 <strong>Efficient Incident Reporting:</strong> Streamline your reporting processes with our intuitive interface.</li>
                            <li>🌐 <strong>Robust Data Management:</strong> Manage and analyze your security data effectively.</li>
                            <li>⚡ <strong>Scalability:</strong> Our solution grows with your needs, deployed on AWS or Azure.</li>
                            <li>🤝 <strong>Dedicated Support:</strong> Our team is here to assist you 24/7.</li>
                        </ul>
                    </div>
                </div>

                {/* Conclusion Section */}
                <div className="text-center">
                    <p className="text-gray-400 text-lg">
                        Experience the peace of mind that comes with having SmartGuard on your side. Let us help you enhance your security operations today!
                    </p>
                </div>
            </div>
        </div>
    );
};
