import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type ApplicationId = bigint;
export interface Application {
    id: ApplicationId;
    name: string;
    address: string;
    mobile: string;
}
export interface backendInterface {
    getAllApplications(): Promise<Array<Application>>;
    getApplicationById(id: ApplicationId): Promise<Application>;
    submitApplication(name: string, mobile: string, address: string): Promise<ApplicationId>;
}
