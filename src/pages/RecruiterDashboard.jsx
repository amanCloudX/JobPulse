import axios from "axios"
import { useState,useEffect } from "react"

const RecruiterDashboard = () => {
    const [jobs, setJobs] = useState([])
    const [applications, setApplications] = useState([])
    const [selectedJob, setselectedJob] = useState(null)

    const token =localStorage.getItem("token")

    //fetch recruiter jobs



  return (
    <>

    </>
  )
}

export default RecruiterDashboard