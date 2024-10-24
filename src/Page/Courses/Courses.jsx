

const Courses = () => {
    return (
        <div className="m-mt_16px">
          

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

    

                    <div className=" bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="relative">
                            <img src='https://itderbd.nextwebservice.com/storage/uploads/course/7674951728743412.jpg' alt="" />
                            <div className="absolute top-0 left-0 p-2">
                                <h3 className="text-white text-xl font-bold">Data Entry</h3>
                            </div>
                        </div>
                        <div className="p-4">
                            <h2 className="text-gray-800 text-lg font-semibold mb-2">Course name from Api</h2>
                            <div className="flex items-center justify-between mb-4">

                                <span className="flex text-blue-500 text-md">★★★★★(no need to change)</span>
                                <span className="ml-2 text-gray-600 text-md font-bold">Triner name from Api</span>
                            </div>
                            {/* <div className="flex gap-2 mb-4 flex-wrap">
                                {['Photography', 'Light set up', 'Camera angle', 'Self Development'].map((tag) => (
                                    <span key={tag} className="bg-yellow-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded">
                                        {tag}
                                    </span>
                                ))}
                            </div> */}
                            <p className="text-gray-600 text-md mb-4">
                           Course Details <span className="text-blue-500">Show Details(no need to change)</span>
                            </p>
                            <hr />
                            <div className="mt-4 flex justify-between items-center">
                                <div>
                                    <span className="line-through text-gray-400 text-sm">Tk 800 (regular price from Api)</span>
                                    <span className="text-green-600 text-md font-bold ml-2">-70% (calculate from regular-discount price)</span>
                                    <span className="text-black text-lg font-bold ml-2">Tk 240( discount price from Api)</span>
                                </div>
                                {/* <span className="text-green-600 text-sm">Earn Tk 48</span> */}
                            </div>
                            <div className="mt-4 flex gap-2">
                                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-500 w-full font-bold text-md">Add To Cart</button>

                            </div>
                        </div>
                    </div>

            </div>
        </div>
    );
};

export default Courses;