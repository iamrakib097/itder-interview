
import { useQuery } from '@tanstack/react-query';
import { fetchCourses } from "../../services/apiCourses";

export function useCourses() {

    const { isLoading,
        data: courses,
        error,
    } = useQuery({
        queryKey: ["courses"],
        queryFn: fetchCourses,

    })

    return { isLoading, courses, error }
}