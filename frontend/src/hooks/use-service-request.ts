import { useCallback, useEffect, useState } from "react";
import apiClient from "../http/api-client";
import { Aircraft } from "./use-aircrafts";
import { MaintenanceCompany } from "./use-maintenance-company";
import { useNavigate, useParams } from "react-router-dom";

export interface ServiceRequestList {
    status: boolean;
    data: ServiceRequest[];
}

export interface CreateServiceRequestResponse {
    success: boolean;
    data: ServiceRequest;
}

export enum Priority {
    LOW = 'low',
    NORMAL = 'normal',
    HIGH = 'high',
    URGENT = 'urgent',
}

export enum Status {
    PENDING = 'pending',
    IN_PROGRESS = 'in progress',
    COMPELETED = 'completed',
}

export interface ServiceRequest {
    id: number;
    aircraft_id: number;
    maintenance_company_id: number;
    description: string;
    priority: Priority;
    status: Status;
    start_date: string;
    due_date: string;
    created_at: string;
    updated_at: string;
    aircraft: Aircraft;
    maintenance_company: MaintenanceCompany;
}

export type UpdateServiceRequest = Omit<ServiceRequest, 'id' | 'created_at' | 'updated_at' | 'aircraft' | 'maintenance_company'>;

export const useServiceRequests = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
    const [selectedServiceRequest, setSelectedServiceRequest] = useState<ServiceRequest | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!params.id || isNaN(parseInt(params.id, 10))) {
            return setSelectedServiceRequest(null);
        }
        const id = parseInt(params?.id, 10);
        const selectedServiceRequest = serviceRequests.find((request) => request.id === id);

        if (selectedServiceRequest) {
            return setSelectedServiceRequest(selectedServiceRequest);
        }

        if (serviceRequests.length) {
            setError(new Error('Service request not found'));
        }
    }, [params, serviceRequests]);

    const createserviceRequest = useCallback(async (company: UpdateServiceRequest) => {
        try {
            setIsLoading(true);
            const response = await apiClient.post<CreateServiceRequestResponse>('/service-request', company);
            
            if (!response.data.success) {
                throw new Error(Object.values(response.data.data)[0]);
            }

            setServiceRequests((prev) => [...prev, response.data.data]);
            setError(null);

            navigate('/service-request');
        } catch (error) {
            setError(error as Error);
        } finally {
            setIsLoading(false);
        }
    }, [navigate]);

    const updateServiceRequest = useCallback(async (id: number, serviceRequest: UpdateServiceRequest) => {
        try {
            setIsLoading(true);
            const response = await apiClient.put<CreateServiceRequestResponse>(`/service-request/${id}`, serviceRequest);
            
            if (!response.data.success) {
                throw new Error(Object.values(response.data.data)[0]);
            }

            setServiceRequests((prevServiceRequests) => prevServiceRequests.map((prev) => prev.id === id ? { ...prev, ...serviceRequest } : prev));
            setError(null);
        } catch (error) {
            setError(error as Error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const listServiceRequests = useCallback(async () => {
        try {
            const response = await apiClient.get<ServiceRequestList>('/service-request');
            
            setServiceRequests(response.data.data);
        } catch (error) {
            setError(error as Error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const deleteServiceRequest = useCallback(async (id: number) => {
        try {
            setIsLoading(true);
            await apiClient.delete(`/service-request/${id}`);
            
            setServiceRequests((prev) => prev.filter((serviceRequest) => serviceRequest.id !== id));
        } catch (error) {
            setError(error as Error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        listServiceRequests();
    }, [listServiceRequests])

    return {
        serviceRequests,
        isLoading,
        error,
        selectedServiceRequest,
        createserviceRequest,
        updateServiceRequest,
        listServiceRequests,
        deleteServiceRequest,
    }
}
