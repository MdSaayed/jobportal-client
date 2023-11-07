import { Link } from "react-router-dom";
import { BiTime } from 'react-icons/bi';
import { BsPeople } from 'react-icons/bs';
import { CiLocationOn } from 'react-icons/ci';
import { useState, useEffect, useContext } from 'react';
import Popup from "../popup/JobApplyPopup";
import { AuthContext } from './../../providers/AuthProvider';

const JobTab = ({ job }) => {
    const { user } = useContext(AuthContext);
    const {
        _id,
        jobTitle,
        category,
        postbanner,
        salary,
        description,
        gender,
        qualification,
        eduRequirements,
        applied,
        postBy,
        postEmail,
        expirationDate,
        statement,
        location } = job;

    const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

    function calculateRemainingTime() {
        const currentDate = new Date();
        const expirationDateObject = new Date(expirationDate);

        if (expirationDateObject <= currentDate) {
            return 'Expired';
        } else if (!isNaN(expirationDateObject)) {
            const timeDifference = expirationDateObject - currentDate;
            const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hoursDifference = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutesDifference = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const secondsDifference = Math.floor((timeDifference % (1000 * 60)) / 1000);

            return `${daysDifference}d ${hoursDifference}h ${minutesDifference}m ${secondsDifference}s remaining`;
        } else {
            console.error('Invalid expirationDate format.');
            return 'Invalid date format';
        }
    }




    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };



    useEffect(() => {
        if (remainingTime !== 'Expired') {
            const interval = setInterval(() => {
                setRemainingTime(calculateRemainingTime());
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [remainingTime]);

    return (
        <div key={job?._id} className='bg-white dark-bg-[#26272D]'>
            <div className='flex mt-6 p-4 border shadow-sm rounded justify-between'>
                <div className='flex gap-1 md:gap-2'>
                    <div>
                        <img className='w-[60px] md:w-[80px]' src={postbanner} alt={postbanner} />
                    </div>
                    <div className='flex gap-0 md:gap-4 flex-col justify-center'>
                        <h2 className='text-xl font-semibold text-[16px] md:text-base'>{jobTitle}</h2>
                        <div className='flex gap-2 md:gap-6 items-center'>
                            <p className='text-[#45A600] font-semibold hidden md:visible'>
                                {postBy}
                            </p>
                            <div className='hidden md:flex gap-1 top-0 right-0  font-semibold items-center text-[10px] md:text-base'>
                                <BiTime />
                                {
                                    remainingTime == 'Expired' ? <p className="text-[red]">{remainingTime}</p> : <p>{remainingTime}</p>
                                }
                            </div>
                            <div className='flex gap-1 font-semibold items-center text-[10px] md:text-base'>
                                <CiLocationOn />
                                <p>{location}</p>
                            </div>
                            <div className='flex gap-1 font-semibold items-center text-[10px] md:text-base'>
                                <BsPeople />
                                <p>Applied: {applied}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <div>
                        <Link to={`/job/${_id}`} className='border-[#153CF5] border py-1 px-2 md:px-4 rounded-sm hover:bg-[#153CF5] hover:text-white block text-[10px] md:text-base'>
                            View Job
                        </Link>
                    </div>
                    <div>
                        <button onClick={openPopup} disabled={remainingTime === 'Expired'} className={remainingTime !== 'Expired' ? ' border py-1 px-2 md:px-4 rounded-sm bg-[#153CF5] hover:bg-[#153af5d6] text-white block text-[10px]  md:text-base' : ' border py-1 px-2 md:px-4 rounded-sm bg-[#153af58e]  text-white block text-[10px] md:text-base'}>
                            {/* 'py-1 px-4 rounded-sm bg-[#153af58e] text-white block text-[12px]' */}
                            Apply Now
                        </button>
                    </div>
                    <div className="min-h-screen absolute flex flex-col items-center justify-center">
                        <Popup isOpen={isPopupOpen} onClose={closePopup}>
                            <div className="bg-white z-20">
                                <h2 className='text-xl font-bold text-[16px] md:text-base py-4'>Application for: <span className="font-semibold">{jobTitle}</span></h2>
                                <form action="">
                                    <div className="flex flex-col gap-4">

                                        <div className="flex flex-col md:flex-row gap-4">
                                            <input className="border w-full focus:outline-none rounded-sm p-1" type="text" defaultValue={user?.displayName} />
                                            <input className="border w-full focus:outline-none rounded-sm p-1" type="email" defaultValue={user?.email} />
                                        </div>
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <input className="border w-full focus:outline-none rounded-sm p-1" type="link" placeholder="Resume link" />
                                        </div>
                                        <div>
                                            <input className="border-[#153CF5] w-full border py-1 px-2 md:px-4 rounded-sm bg-[#153CF5] hover:bg-[#153af5c7] text-white block md:text-base'" type="button" value="Submit Application" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </Popup>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobTab;
