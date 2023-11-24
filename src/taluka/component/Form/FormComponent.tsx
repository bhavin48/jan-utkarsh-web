import React, { useEffect } from 'react'
import { FormBox, InputBox } from '../../../components/AntdAddons'
import { Col, Row } from 'antd';
import { useAppSelector } from '../../../store/app';
import { rules } from './rules';

const FormComponent: React.FC<any> = ({ form,
    id,
    handleSubmit,
    onValuesChange,
    editValues
}) => {
    const pincodeList = useAppSelector(state => state.taluka.pincodeNo)
    const onFinish = (data: any) => {
        handleSubmit(data)
    }
    const {
        pincode,
    } = editValues ?? {};


    useEffect(() => {
        if (editValues) {
            form.setFieldsValue({ ...editValues, pincode: editValues.pincode.id });
        }
    }, [editValues, form]);
    return (
        <>
            <FormBox
                form={form}
                id={id}
                onFinish={onFinish}
                onValuesChange={onValuesChange}
            >
                <Row gutter={15}>
                    <>
                        <br />
                        <br />
                        <Col xs={{ span: 24 }}>
                            <b>Taluka Details:</b>
                        </Col>

                        <br />
                        <br />
                        <Col xs={{ span: 24 }} md={{ span: 12 }}>
                            <InputBox.Text
                                required
                                name="name"
                                label="Taluka Name"
                                rules = {rules.name()}
                            />
                        </Col>
                        <Col xs={{ span: 24 }} md={{ span: 12 }}>
                            <InputBox.Select
                                required
                                label="Pincode"
                                name="pincode"
                                options={{
                                    list: pincodeList,
                                    valueKey: "id",
                                    textKey: "pincode",
                                }}
                                rules = {rules.pincode()}
                            />
                        </Col>
                    </>
                </Row>
            </FormBox>
        </>
    )
}

export default FormComponent