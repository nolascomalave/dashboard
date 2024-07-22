export type FullUser = {
    id: number;
    id_system: number;
    id_system_subscription: number;
    id_entity: number;
    id_system_subscription_user: number;
    username: string;
    password: string;
    names_obj: string | {
        id_entity_name_type: number;
        type: string;
        names: string[]
    }[];
    name: string;
    complete_name: string;
    names: string | null;
    surnames: string | null;
    documents: string | null | {[key: string | symbol]: any};
    phones: string | null;
    emails: string | null;
    is_admin: number | boolean;
    annulled_at_system: Date | null;
    annulled_at_system_subscription: Date | null;
    annulled_at_system_subscription_user: Date | null;
    annulled_by_system_subscription: Date | null;
    annulled_by_system_subscription_user: Date | null;
    annulled_at: Date | null;
    annulled_by: number | null;
};

export type CompleteEntityUser = {
    id: number;
    id_system: number;
    id_system_subscription: number;
    id_entity: number;
    id_system_subscription_user: number;
    username: string;
    password: string;
    name: string;
    names_obj: string | {
        type: string,
        names: string[],
        id_entity_name_type: number
    }[];
    complete_name: string;
    names: string | null;
    surnames: string | null;
    documents: null | {
        id: number,
        order: number,
        symbol: string,
        id_city: null | number,
        category: string,
        document: string,
        id_state: null | number,
        id_entity: number,
        id_country: null | number,
        id_entity_document: number,
        id_entity_document_category: number
    };
    phones: null | string[];
    emails: null | string[];
    is_admin: number | boolean;
    annulled_at_system: Date | null;
    annulled_at_system_subscription: Date | null;
    annulled_at_system_subscription_user: Date | null;
    annulled_by_system_subscription: Date | null;
    annulled_by_system_subscription_user: Date | null;
    annulled_at: Date | null;
    annulled_by: number | null;
    id_entity_parent: number;
    id_document: number;
    is_natural: 1 | 0;
    gender: null | 'Male' | 'Female';
    date_birth: null | string | Date;
    address: null | string;
    photo: null | string;
    created_at: number;
    created_by: number;
    updated_at: number;
    updated_by: number;
    legal_name: null | string;
    business_name: null | string;
    comercial_designation: null | string;
}