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
    const zoomScale = Math.max(1 - scrollY / 800, 0.9); // Adjust 600 for zoom effect distance

    return (
        <div className="min-h-screen flex bg-[#1A1B1C] text-white p-10">
            <div className="max-w-4xl mx-auto bg-[#2c2c2c] shadow-lg rounded-lg p-6">
                <h1 className="text-4xl font-bold text-center text-blue-400 mb-8">About SmartGuard</h1>
                
                {/* First Image with Zoom Effect */}
                <div className="relative mb-6 overflow-hidden">
                    <img
                        src="./images/bg11.png" // Replace with your image source
                        alt="SmartGuard System Overview"
                        className="w-full rounded-lg"
                        style={{
                            transform: `scale(${zoomScale})`,
                            transition: 'transform 0.2s ease-in-out'
                        }}
                    />
                </div>

                <h2 className="text-2xl font-semibold text-gray-300 mb-4">What is SmartGuard?</h2>
                <p className="text-gray-400 mb-6">
                    SmartGuard is a cutting-edge real-time personnel tracking and incident response system designed to enhance security and operational efficiency. By utilizing advanced GPS technology and robust data management, SmartGuard ensures that your security personnel are always accounted for and capable of responding to incidents promptly.
                </p>
                
                <h2 className="text-2xl font-semibold text-gray-300 mb-4">Why Choose Us?</h2>
                <ul className="list-disc list-inside text-gray-400 mb-6">
                    <li>🔒 <strong>Real-Time Tracking:</strong> Always know the location of your personnel.</li>
                    <li>📈 <strong>Efficient Incident Reporting:</strong> Streamline your reporting processes with our intuitive interface.</li>
                    <li>🌐 <strong>Robust Data Management:</strong> Manage and analyze your security data effectively.</li>
                    <li>⚡ <strong>Scalability:</strong> Our solution grows with your needs, deployed on AWS or Azure.</li>
                    <li>🤝 <strong>Dedicated Support:</strong> Our team is here to assist you 24/7.</li>
                </ul>

                {/* Second Image with Zoom Effect */}
                <div className="relative mb-6 overflow-hidden">
                    <img
                        src="./images/about.png" // Replace with your image source
                        alt="SmartGuard Features"
                        className="w-full rounded-lg"
                        style={{
                            transform: `scale(${zoomScale})`,
                            transition: 'transform 0.2s ease-in-out'
                        }}
                    />
                </div>

                <p className="text-center text-gray-400">
                    Experience the peace of mind that comes with having SmartGuard on your side. Let us help you enhance your security operations today!
                </p>
            </div>
        </div>
    );
};
