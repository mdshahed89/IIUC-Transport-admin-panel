"use server";

import { revalidatePath } from "next/cache";

// const API_LINK = "https://iiuc-transport-system.onrender.com/api/admin";
const API_LINK = "http://147.93.107.88:5000/api/admin";

export const create = async ({ endpoint, data }) => {
  try {
    console.log("start");
    console.log(data);
    const response = await fetch(`${API_LINK}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const resData = await response.json();
    console.log(resData);
    console.log("rend");
    return resData;
  } catch (e) {
    console.log(e);
  }
};

export const getData = async ({ endpoint }) => {
  try {
    const res = await fetch(`${API_LINK}${endpoint}`);
    // console.log("res", `End: ${API_LINK}${endpoint}`, res);
    const data = await res.json();
    // console.log(`End: ${API_LINK}${endpoint}`, data);
    return data;
  } catch (e) {
    console.log(`End: ${API_LINK}${endpoint}`, e?.message);
  }
};

export const editData = async ({ endpoint, data }) => {
  try {
    const response = await fetch(`${API_LINK}${endpoint}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const resData = await response.json();
    return resData;
  } catch (e) {
    console.log(e);
  }
};

export const deleteData = async (endpoint) => {
  try {
    const deleted = await fetch(`${API_LINK}${endpoint}`, {
      method: "DELETE",
    });

    return deleted;
  } catch (e) {
    console.log(e?.message);
  }
};

export const scaheduleStatusToggle = async (id, isActive) => {
  try {
    const toggle = await editData({
      endpoint: `/bus-schedules/${id}/toggle`,
      data: { isActive: !isActive },
    });
    if (!toggle?.error) {
      revalidatePath("/dashboard/schedule");
    }
  } catch (e) {
    console.log(e);
  }
};

export const deleteDataAndRevalidatePath = async ({
  endpoint,
  revalidtionPath,
}) => {
  try {
    const deleted = await fetch(`${API_LINK}${endpoint}`, {
      method: "DELETE",
    });

    console.log(deleted.status);

    if (deleted.status === 204) {
      revalidatePath(revalidtionPath);
    }
  } catch (e) {
    console.log(e?.message);
  }
};

export const getDashboard = async () => {
  return getData({ endpoint: "/dashboard" });
};

export const fetchNotification = async () => {
  return getData({ endpoint: "/notification" });
};

export const fetchFeedback = async () => {
  return getData({ endpoint: "/feedback" });
};
export const getBusSchedules = async () => {
  return getData({ endpoint: "/bus-schedules" });
};

export const getBusScheduleById = async (id) => {
  return getData({ endpoint: `/bus-schedules/${id}` });
};

export const getBusInfo = async () => {
  return getData({ endpoint: "/bus-info" });
};
export const getBusInfoById = async (id) => {
  return getData({ endpoint: `/bus-info/${id}` });
};

export const getAssignBus = async () => {
  return getData({ endpoint: "/assign-bus" });
};

export const getAssignBusById = async (id) => {
  return getData({ endpoint: `/assign-bus/${id}` });
};

export const getDriverInfo = async () => {
  return getData({ endpoint: `/driver-info` });
};

export const getHelperInfo = async () => {
  return getData({ endpoint: `/helper-info` });
};
