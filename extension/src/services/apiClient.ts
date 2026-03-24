import axios from 'axios';

const API_BASE = 'http://localhost:3000';

export async function analyzeError(file: string, errorMsg: string) {
    const res = await axios.post(`${API_BASE}/analyze`, { file, errorMsg });
    return res.data;
}

export async function getReports() {
    const res = await axios.get(`${API_BASE}/reports`);
    return res.data;
}

export async function checkRemote() {
    const res = await axios.get(`${API_BASE}/remote`);
    return res.data;
}
