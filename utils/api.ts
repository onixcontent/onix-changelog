import axios, { AxiosRequestConfig } from "axios";

const githubToken = process.env.NEXT_GITHUB_TOKEN;

export const axiosClient = axios.create({
  maxBodyLength: Infinity,
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `Bearer ${githubToken}`,
  },
});

export const config: AxiosRequestConfig = {
  withCredentials: true,
  maxBodyLength: Infinity,
};

export const getOnixReleases = async (): Promise<any[]> => {
  try {
    const response = await axiosClient.get(
      "/repos/onixcontent/bug-tracker/releases",
      {
        ...config,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao fazer requisição:", error);
    throw error; // Você pode tratar o erro de outra forma se preferir
  }
};
