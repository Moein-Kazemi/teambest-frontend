import { IProject } from "./../interfaces/projectInterfaces";
import axios from "axios";
import { getServerSession } from "next-auth";

import { unstable_cache } from "next/cache";
import { authOptions } from "./auth";
import { RegisterFormData } from "@/validation/authValidationsSchema";
import { IUser } from "@/interfaces/userInterfaces";
import { ITeam } from "@/interfaces/teamInterfaces";

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`;

// TYPE CHECKER
interface ProjectsResponse {
  status: string;
  results: number;
  data: {
    projects: IProject[];
  };
}
// declare module "next-auth" {
//   /**
//    * گسترش دادن نوع Session برای اضافه کردن accessToken
//    */
//   interface Session {
//     accessToken?: string;
//     user?: {
//       id?: string;
//       name?: string;
//       family?: string;
//       phone?: string;
//       role?: string;
//       jobTitle?: string;
//       teamId?: string;
//       accessToken?: string; // این خط هم اضافه شد تا در session.user هم دسترسی داشته باشید
//     } & DefaultSession["user"];
//   }

//   /**
//    * گسترش دادن نوع JWT برای هماهنگی با callback های jwt
//    */
//   // interface JWT {
//   //   accessToken?: string;
//   //   id?: string;
//   //   name?: string;
//   //   family?: string;
//   //   phone?: string;
//   //   role?: string;
//   //   jobTitle?: string;
//   //   teamId?: string;
//   // }
// }
// 1) create instance
// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // FOR SEND COOKIES
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
          `/projects?teamId=${teamId}&sort=-createdAt`,
        );
        return data;
      } catch (error) {
        console.error("خطا در دریافت پروژه ها.", error);
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
        `/tasks?assigneeTo.assigneeId=${assigneeId}&sort=-createdAt`,
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

export const authAPI = {
  signup: async (data: RegisterFormData) => {
    try {
      const { data: responseResult } = await axios.post(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/auth/signup`,
        {
          name: data.name,
          family: data.family,
          phone: data.phone,
          password: data.password,
          passwordConfirm: data.passwordConfirm,
        },
      );
      return responseResult;
    } catch (err) {
      console.log(err);
    }
  },
  setRoleCookie: async () => {
    const { data: setRoleCookieResponse } = await axios.get(
      "/api/auth/set-role-cookie",
    );
    return setRoleCookieResponse;
  },
  clearRoleCookie: async () => {
    const { data: clearRoleCookieRes } = await axios.get(
      "/api/auth/clear-role-cookie",
    );
    return clearRoleCookieRes;
  },
};

// export const userAPI = {
//   getUser: async (userId: string) => {
//     return unstable_cache(
//       async () => {
//         const { data } = await api.get(`/users/${userId}`);

//         return data.data.user as IUser;
//       },

//       [`user-${userId}`],

//       {
//         revalidate: 1800, // cache for 30 minutes
//         tags: [`user-${userId}`],
//       },
//     )();
//   },
// };

//CHANGE THESE CODE BASE ON THE API

// GET ALL INFOR OF LOGIN USER
export const getUser = async (userId: string) => {
  const session = await getServerSession(authOptions);
  return unstable_cache(
    async (): Promise<IUser> => {
      const { data } = await api.get(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      return data.data.user;
    },

    [`user-${userId}`],

    {
      revalidate: 1800,
      tags: [`user-${userId}`],
    },
  )();
};

// GET TEAM INFO
export const getTeam = async (teamId: string): Promise<ITeam> => {
  const session = await getServerSession(authOptions);
  return unstable_cache(
    async (): Promise<ITeam> => {
      const { data } = await api.get(`/teams/${teamId}`, {
        headers: { Authorization: `Bearer ${session?.accessToken}` },
      });
      return data.data.team;
    },
    [`team-${teamId}`],
    { revalidate: 1800, tags: [`team-${teamId}`] },
  )();
};

api.interceptors.request.use(async (config) => {
  try {
    const session = await getServerSession(authOptions);
    console.log(session?.accessToken);

    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
  } catch (error) {
    console.error("Error fetching session for axios interceptor:", error);
  }
  return config;
});

/*

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
