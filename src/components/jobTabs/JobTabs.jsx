import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useJobs from '../../hooks/useJobs';
import { useState } from 'react';
import Loading from './../loading/Loading';
import { BiTime } from 'react-icons/bi';
import { CiLocationOn } from 'react-icons/ci';
import { Link } from 'react-router-dom';

const JobTabs = () => {
    const { data, isLoading, isFetching } = useJobs();
    const [tabJobs, setTabJobs] = useState(data?.jobs);

    const handleJobsFilter = (ctg) => {
        const filtered = data?.jobs?.filter((job) => ctg.include(job.category));
        setTabJobs(filtered);
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <div className='py-16 max-w-6xl mx-auto'>
                <Tabs>
                    <TabList>
                        <Tab onClick={() => handleJobsFilter("all")} key="all">
                            All
                        </Tab>
                        {data?.categories?.map((category) => (
                            <Tab
                                onClick={() => handleJobsFilter(category?.name)}
                                key={category?._id}
                            >
                                {category?.name}
                            </Tab>
                        ))}
                    </TabList>
                    <TabPanel>
                        {data.jobs?.map((job) => (
                            <div key={job?._id} className='bg-white dark-bg-[#26272D]'>
                                <div className='flex mt-6 p-4 border shadow-sm rounded justify-between'>
                                    <div className='flex'>
                                        <div>
                                            <img
                                                className='w-[100px]'
                                                src={'https://i.ibb.co/xM0Qj77/download-2.jpg'}
                                                alt={job.postedBy}
                                            />
                                        </div>
                                        <div className='flex gap-4 flex-col justify-center'>
                                            <h2 className='text-xl font-semibold'>{job.jobTitle}</h2>
                                            <div className='flex gap-6 items-center'>
                                                <p className='text-[#1bbf73] font-semibold'>
                                                    {job.postedBy}
                                                </p>
                                                <div className='flex gap-1 font-semibold items-center'>
                                                    <BiTime />
                                                    <p>{job.category}</p>
                                                </div>
                                                <div className='flex gap-1 font-semibold items-center'>
                                                    <CiLocationOn />
                                                    <p>{job.location}</p>
                                                </div>
                                                <div className='flex gap-1 font-semibold items-center'>
                                                    <BiTime />
                                                    <p>{job.postingDate}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-8'>
                                        <div>
                                            <Link to={`/job/${job._id}`} className='border-[#1bbf73] border py-1 px-4 rounded-sm hover:bg-[#1bbf73] hover:text-white'>View Job</Link>
                                        </div>
                                        <div>
                                            <button className='bg-[#1bbf73] py-1 px-4 rounded-sm hover-bg-[#1bbf72d0] text-white'>
                                                Apply Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </TabPanel>
                    <div className='flex items-center justify-center py-8'>
                        <div>
                            <button className='border-[#1bbf73] border py-1 px-4 rounded-sm hover-bg-[#1bbf73] hover-text-white font-medium'>
                                Load More Jobs
                            </button>
                        </div>
                    </div>
                </Tabs>
            </div>
        </div>
    );
};

export default JobTabs;
