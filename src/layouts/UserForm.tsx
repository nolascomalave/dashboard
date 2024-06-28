'use client';
// import { InputWithLabel } from "@/components/InputWithLabel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { useFormik } from 'formik';
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import ModalFooter from "@/UI/ModalFooter";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea";
import { userSchema, genders } from "@/util/ValidationSchemas/userForm";

type Inputs = {
    first_name: string;
    second_name: string;
    first_surname: string;
    second_surname: string;
    gender: 'M' | 'F';
    ssn: string | number;
    email: string;
    first_phone: string | number;
    second_phone: string | number;
    address: string
};

const FormInputContainer = ({children}: {children: React.ReactNode}) => (
    <div
        className="w-full items-center gap-1.5"
        style={{
            width: 'calc(50% - 0.5rem)'
        }}
    >
        {children}
    </div>
);

const ErrorMessage = ({children}: {children: React.ReactNode}) => {
    return (
        <p style={{
            color: 'rgb(220 38 38)',
            marginTop: '0.5rem',
            fontSize: '0.75rem',
            lineHeight: '1'
        }}>{children}</p>
    )
}

export default function UserForm({
    closeModal,
    clasName,
    ...props
}: {
    closeModal: () => void,
    clasName?: string,
    props: any[]
}) {
    /* const formik = useFormik({
        initialValues: {
            first_name: '',
            second_name: '',
            first_surname: '',
            second_surname: '',
            gender: '',
            ssn: '',
            email: '',
            first_phone: '',
            second_phone: '',
            address: ''
        },
        onSubmit: values => {
            console.log('Hola');
          alert(JSON.stringify(values, null, 2));
        },
    }); */

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(userSchema),
    });


    const onSubmit: SubmitHandler<Inputs> = (data) => {
        alert(JSON.stringify(data, null, 2));
    };

    return (
        <>
            <form
                // onSubmit={formik.handleSubmit}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div
                    {...props}
                    className={clsx({
                        "w-full h-full flex justify-center items-center": true,
                        ...(!clasName ? {} : {[clasName]: true})
                    })}
                >
                    <div
                        className="flex flex-wrap gap-4"
                        style={{
                            minWidth: '12.5rem',
                            width: '30rem',
                            maxWidth: '100%'
                        }}
                    >
                        <FormInputContainer>
                            <Label htmlFor="first_name">First Name</Label>
                            <Input
                                type="string"
                                // name="first_name"
                                id="first_name"
                                {...register("first_name")}
                                // onChange={formik.handleChange}
                                // value={formik.values.first_name}
                                placeholder="First Name"
                            />
                            {errors.first_name?.message && <ErrorMessage>{errors.first_name?.message}</ErrorMessage>}
                        </FormInputContainer>

                        <FormInputContainer>
                            <Label htmlFor="second_name">Second Name</Label>
                            <Input
                                type="string"
                                // name="second_name"
                                id="second_name"
                                {...register("second_name")}
                                // onChange={formik.handleChange}
                                // value={formik.values.second_name}
                                placeholder="Second Name"
                            />
                            {errors.second_name?.message && <ErrorMessage>{errors.second_name?.message}</ErrorMessage>}
                        </FormInputContainer>

                        <FormInputContainer>
                            <Label htmlFor="first_surname">First Surname</Label>
                            <Input
                                type="string"
                                // name="first_surname"
                                id="first_surname"
                                {...register("first_surname")}
                                // onChange={formik.handleChange}
                                // value={formik.values.first_surname}
                                placeholder="First Surname"
                            />
                            {errors.first_surname?.message && <ErrorMessage>{errors.first_surname?.message}</ErrorMessage>}
                        </FormInputContainer>

                        <FormInputContainer>
                            <Label htmlFor="second_surname">Second Surname</Label>
                            <Input
                                type="string"
                                // name="second_surname"
                                id="second_surname"
                                {...register("second_surname")}
                                // onChange={formik.handleChange}
                                // value={formik.values.second_surname}
                                placeholder="Second Surname"
                            />
                            {errors.second_surname?.message && <ErrorMessage>{errors.second_surname?.message}</ErrorMessage>}
                        </FormInputContainer>

                        <FormInputContainer>
                            <Label htmlFor="gender">Gender</Label>
                            <Select
                                // name="gender"
                                {...register("gender")}
                                // onValueChange={formik.handleChange}
                                // value={formik.values.gender}
                            >
                                <SelectTrigger id="gender" className="w-full">
                                    <SelectValue placeholder="Select a gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Gender</SelectLabel>
                                        {Object.keys(genders).map((el: string, i: number) => {
                                            return (
                                                <SelectItem key={i} value={el}>{genders[el]}</SelectItem>
                                            );
                                        })}
                                        <SelectItem value="banana">Banana</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {errors.gender?.message && <ErrorMessage>{errors.gender?.message}</ErrorMessage>}
                        </FormInputContainer>

                        <FormInputContainer>
                            <Label htmlFor="ssn">SSN</Label>
                            <Input
                                type="string"
                                // name="ssn"
                                id="ssn"
                                {...register("ssn")}
                                // onChange={formik.handleChange}
                                // value={formik.values.ssn}
                                placeholder="Social Security Number"
                            />
                            {errors.ssn?.message && <ErrorMessage>{errors.ssn?.message}</ErrorMessage>}
                        </FormInputContainer>

                        <FormInputContainer>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                // name="email"
                                id="email"
                                {...register("email")}
                                // onChange={formik.handleChange}
                                // value={formik.values.email}
                                placeholder="Email"
                            />
                            {errors.email?.message && <ErrorMessage>{errors.email?.message}</ErrorMessage>}
                        </FormInputContainer>

                        <FormInputContainer>
                            <Label htmlFor="first_phone">First Phone</Label>
                            <Input
                                type="string"
                                // name="first_phone"
                                id="first_phone"
                                {...register("first_phone")}
                                // onChange={formik.handleChange}
                                // value={formik.values.first_phone}
                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="Phone"
                            />
                            {errors.first_phone?.message && <ErrorMessage>{errors.first_phone?.message}</ErrorMessage>}
                        </FormInputContainer>

                        <FormInputContainer>
                            <Label htmlFor="second_phone">Second Phone</Label>
                            <Input
                                type="string"
                                // name="second_phone"
                                id="second_phone"
                                {...register("second_phone")}
                                // onChange={formik.handleChange}
                                // value={formik.values.second_phone}
                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="Phone"
                            />
                            {errors.second_phone?.message && <ErrorMessage>{errors.second_phone?.message}</ErrorMessage>}
                        </FormInputContainer>

                        <div
                            className="w-full items-center gap-1.5"
                        >
                            <Label htmlFor="address">Address</Label>
                            <Textarea
                                id="address"
                                // name="address"
                                // onChange={formik.handleChange}
                                // value={formik.values.address}
                                {...register("address")}
                                placeholder="Address"
                                rows={3}
                                style={{
                                    minHeight: '5rem'
                                }}
                            />
                            {errors.address?.message && <ErrorMessage>{errors.address?.message}</ErrorMessage>}
                        </div>
                    </div>
                </div>

                <ModalFooter>
                    <div
                        className="flex items-center gap-2"
                        style={{
                            justifyContent: 'flex-end'
                        }}
                    >
                        <button
                            type="button"
                            className="flex text-sm items-center gap-1 bg-primary_layout focus:outline-none hover:bg-secondary_layout text-white font-bold p-2 px-3 rounded"
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            // onClick={(e: any) => formik.handleSubmit}
                            className="flex text-sm items-center gap-1 bg-primary_layout focus:outline-none hover:bg-secondary_layout text-white font-bold p-2 px-3 rounded"
                        >
                            Accept
                        </button>
                    </div>
                </ModalFooter>
            </form>
        </>
    );
}