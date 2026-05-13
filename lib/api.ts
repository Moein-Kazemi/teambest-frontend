import { IProject } from "@/interfaces/projectInterfaces";
import axios from "axios";

import { unstable_cache } from "next/cache";

const API_URL = "http://localhost:5000/api/v1";

// TYPE CHECKER
interface ProjectsResponse {
  status: string;
  results: number;
  data: {
    projects: IProject[];
  };
}

// 1) create instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// PROJECTS API
export const projectsAPI = {
  getProjectsByTeam: unstable_cache(
    async (teamId: string) => {
      try {
        const { data } = await api.get<ProjectsResponse>(
          `/projects?teamId=${teamId}`,
        );
        return data;
      } catch (error) {
        console.error("Error fetching projects:", error);
        throw error;
      }
    },
    ["projects-by-team"],
    {
      revalidate: 3600, // cache for one hour
      tags: ["projects"], // for manualy delete cache
    },
  ),

  getById: async (id: string) => {
    try {
      const { data } = await api.get(`/projects/${id}`);
      return data;
    } catch (err) {
      console.log(err);
    }
  },
  // update: (id, data) => api.put(`/projects/${id}`, data),
  // addStage: (projectId, stage) => api.post(`/projects/${projectId}/stages`, stage),
};

//  TASKS API
export const tasksAPI = {
  getAllMyTasks: async (assigneeId: string) => {
    try {
      const { data } = await api.get(
        `/tasks?assigneeTo.assigneeId=${assigneeId}`,
      );
      return data;
    } catch (err) {
      console.log(err);
    }
  },
  getTaskById: async (id: string) => {
    try {
      const { data } = await api.get(`/tasks/${id}`);
      return data;
    } catch (err) {
      console.log(err);
    }
  },
};

/* 
CHANGE THESE CODE BASE ON THE API

// اضافه کردن token به هر درخواست
api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

// Teams APIs
export const teamsAPI = {
  create: (data) => api.post('/teams', data),
  getAll: () => api.get('/teams'),
  getById: (id) => api.get(`/teams/${id}`),
  addMember: (teamId, userId, role) => api.post(`/teams/${teamId}/members`, { userId, role }),
  removeMember: (teamId, userId) => api.delete(`/teams/${teamId}/members/${userId}`),
  updateMemberRole: (teamId, userId, role) => api.put(`/teams/${teamId}/members/${userId}`, { role }),
};

// Projects APIs
export const projectsAPI = {
  create: (data) => api.post('/projects', data),
  getAll: (teamId) => api.get(`/projects?teamId=${teamId}`),
  getById: (id) => api.get(`/projects/${id}`),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
  addStage: (projectId, stage) => api.post(`/projects/${projectId}/stages`, stage),
};

// Tasks APIs
export const tasksAPI = {
  create: (data) => api.post('/tasks', data),
  getByProject: (projectId) => api.get(`/tasks?projectId=${projectId}`),
  updateStatus: (taskId, status) => api.put(`/tasks/${taskId}/status`, { status }),
  assign: (taskId, userId) => api.put(`/tasks/${taskId}/assign`, { userId }),
};

// Chat APIs
export const chatAPI = {
  getMessages: (projectId) => api.get(`/chat/${projectId}`),
  sendMessage: (data) => api.post('/chat', data),
};

// Notes APIs
export const notesAPI = {
  getAll: () => api.get('/notes'),
  create: (data) => api.post('/notes', data),
  update: (id, data) => api.put(`/notes/${id}`, data),
  delete: (id) => api.delete(`/notes/${id}`),
};


*/
export default api;
