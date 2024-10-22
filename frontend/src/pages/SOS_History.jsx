export const SOS_History = () => {
    const sosData = [
        { id: 1, date: '2024-10-20', time: '14:35', message: 'SOS Call to Officer John Doe' },
        { id: 2, date: '2024-10-19', time: '11:22', message: 'SOS Message sent to HQ' },
        { id: 3, date: '2024-10-18', time: '09:48', message: 'SOS Call from Officer Jane Smith' },
        { id: 4, date: '2024-10-17', time: '16:03', message: 'SOS Call from Officer Mark Johnson' },
        { id: 5, date: '2024-10-16', time: '10:00', message: 'SOS Message received from Unit 3' },
        { id: 6, date: '2024-10-15', time: '18:12', message: 'SOS Call to Emergency Services' },
        { id: 7, date: '2024-10-14', time: '08:45', message: 'SOS Call from Officer Maria Lopez' },
        { id: 8, date: '2024-10-13', time: '22:30', message: 'SOS Call to Officer Samuel Green' },
        { id: 9, date: '2024-10-12', time: '13:15', message: 'SOS Message sent to HQ' },
        { id: 10, date: '2024-10-11', time: '15:50', message: 'SOS Call from Officer James Lee' },
        // Add more data if necessary
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#18191B] text-white">
            <h1 className="text-3xl font-bold mb-8">SOS History</h1>
            <div className="w-full max-w-4xl space-y-4">
                {sosData.map((sos) => (
                    <div key={sos.id} className="bg-[#333] p-6 rounded-lg shadow-md hover:bg-[#444] transition-all">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-lg font-semibold">Date: {sos.date}</p>
                                <p className="text-md">Time: {sos.time}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium">{sos.message}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
