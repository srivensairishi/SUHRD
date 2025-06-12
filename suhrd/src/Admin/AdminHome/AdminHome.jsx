

function AdminHome() {
    const userData = [
  {
    phone: '12345 67890',
    location: 'Kallahalli',
    address: 'Halasuru, Bengaluru, Karnataka',
    coordinates: '12.9856, 77.6288',
    time: '1809',
    date: '11th Nov 24',
  },
  {
    phone: '12345 67890',
    location: 'Kallahalli',
    address: 'Halasuru, Bengaluru, Karnataka',
    coordinates: '12.9856, 77.6288',
    time: '1819',
    date: '11th Nov 24',
  }
];
    return(
        <>
            <div className="w-full max-w-6xl mx-auto px-4 font-sans">
                <div className="grid grid-cols-4 gap-4 border-b py-2 text-sm font-semibold text-gray-700">
                    <div>#No</div>
                    <div>Phone No</div>
                    <div>Geo Location</div>
                    <div>Time</div>
                </div>

                {userData.map((entry, index) => (
                <div key={index} className="grid grid-cols-4 gap-4 py-4 border-b text-sm">
                            <div>{index + 1}.</div>
                    <div>
                        <a href={`tel:${entry.phone.replace(/\s/g, '')}`} className="text-fuchsia-600 underline" >{entry.phone}</a>
                    </div>

                    <div className="space-y-1">
                        <div>{entry.location}</div>
                        <div className="text-gray-500 text-xs">{entry.address}</div>
                        <a href={`https://www.google.com/maps?q=${entry.coordinates}`} className="text-fuchsia-600 underline text-xs" >{entry.coordinates}</a>
                    </div>

                    <div>
                        <div>{entry.time}</div>
                        <div className="text-sm">{entry.date}</div>
                    </div>
                </div>
                ))}
            </div>
            <div className="mt-64">
            </div>    
              
        </>
    )
}

export default AdminHome;