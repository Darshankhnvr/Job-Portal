import api from './authService';

export const applicationService = {
    applyToJob: async (jobId, formData) => {
        const response = await api.post(`/apply/${jobId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    getMyApplications: async () => {
        const response = await api.get('/my-applications');
        return response.data;
    },

    getJobApplicants: async (jobId) => {
        const response = await api.get(`/job/${jobId}/applicants`);
        return response.data;
    },
};
