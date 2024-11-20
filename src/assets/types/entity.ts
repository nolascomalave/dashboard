export type CompleteEntity = {
    id: number;
    id_entity_parent: number;
    id_document: number;
    is_natural: 1 | 0;
    name: string;
    gender: null | 'Male' | 'Female';
    date_birth: null | string | Date;
    address: null | number;
    photo: null | string;
    created_at: number;
    created_by: number;
    updated_at: number;
    updated_by: number;
    annulled_at: number;
    annulled_by: number;
    complete_name: string;
    names_obj: string | {
        type: string,
        names: string[],
        id_entity_name_type: number
    }[];
    names: null | string;
    surnames: null | string;
    legal_name: null | string;
    business_name: null | string;
    comercial_designation: null | string;
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
    id_system: number;
    id_system_subscription: number;
    id_system_subscription_user: number;
}