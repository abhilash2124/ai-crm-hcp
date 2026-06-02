export default function Doctors({ interactions = [] }) {

    const doctorMap = {};

    interactions.forEach((item) => {

        if (!doctorMap[item.hcp_name]) {
            doctorMap[item.hcp_name] = {
                name: item.hcp_name,
                meetings: 0,
                positive: 0,
                neutral: 0,
                negative: 0,
            };
        }

        doctorMap[item.hcp_name].meetings++;

        if (item.sentiment === "positive") {
            doctorMap[item.hcp_name].positive++;
        }

        if (item.sentiment === "neutral") {
            doctorMap[item.hcp_name].neutral++;
        }

        if (item.sentiment === "negative") {
            doctorMap[item.hcp_name].negative++;
        }
    });

    const doctors = Object.values(doctorMap);

    return (
        <div className="p-6 bg-white rounded-xl shadow">

            <h1 className="text-2xl font-bold mb-6">
                Doctors
            </h1>

            <div className="overflow-x-auto">

                <table className="w-full border-collapse">

                    <thead>
                        <tr className="border-b">
                            <th className="text-left p-3">Doctor</th>
                            <th className="text-left p-3">Meetings</th>
                            <th className="text-left p-3">Positive</th>
                            <th className="text-left p-3">Neutral</th>
                            <th className="text-left p-3">Negative</th>
                        </tr>
                    </thead>

                    <tbody>
                        {doctors.map((doctor) => (
                            <tr
                                key={doctor.name}
                                className="border-b hover:bg-gray-50"
                            >
                                <td className="p-3">
                                    {doctor.name}
                                </td>

                                <td className="p-3">
                                    {doctor.meetings}
                                </td>

                                <td className="p-3 text-green-600">
                                    {doctor.positive}
                                </td>

                                <td className="p-3 text-yellow-600">
                                    {doctor.neutral}
                                </td>

                                <td className="p-3 text-red-600">
                                    {doctor.negative}
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>

        </div>
    );
}