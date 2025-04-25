export type CompleteEntity = {
    id: number;
    entity_parent_id: string;
    document_id: string;
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
        entity_name_type_id: string
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
        city_id: null | number,
        category: string,
        document: string,
        state_id: null | number,
        entity_id: string,
        country_id: null | number,
        entity_document_id: string,
        entity_document_category_id: string
    };
    phones: null | string[];
    emails: null | string[];
    system_id: string;
    system_subscription_id: string;
    system_subscription_user_id: string;
}