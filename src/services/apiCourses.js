import axios from "axios";

export const fetchCourses=async ()=>{
    const {data}=await axios.get("https://itder.com/api/get-course-list")
    return data;
}