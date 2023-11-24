import { Button, Drawer, DrawerProps, Form } from 'antd'
import React, { useState } from 'react'
import { validateFields } from '../../../config/Global'
import SVGIcon from '../../../utils/SVGIcon'
import Config from '../../../config/Config'
import FormComponent from './FormComponent'
import { useAppDispatch } from '../../../store/app'
import { createTaluka } from '../utils/talukaSlice'
import { assignErrorToInput } from '../../../store/api'

interface AddDrawerProps extends DrawerProps {
    titleName: string,
    close: () => void
}
const AddComponent: React.FC<AddDrawerProps> = ({ titleName, close, ...rest }) => {

    const [form] = Form.useForm()
    const [disabled, setDisabled] = useState<boolean>(true);
    const [saving, setSaving] = useState<boolean>(false);
    const dispatch = useAppDispatch()
    const drawerClose = () => {
        close();
        form.resetFields();
        setDisabled(true)
    }

    const validateForm = () => {
        validateFields(form, setDisabled)
    }

    const handleFormSubmit = (data: any) => {
        // console.log("data ", data);
        dispatch(createTaluka(data))
        .then(() => {
            drawerClose()
        })
        .catch((error: any) => {
            assignErrorToInput(form, error?.STATUS);
          })
          .finally(() => setSaving(false));
    }
    return (
        <>
            <Drawer
                title={`Add ${titleName}`}
                placement="right"
                width={"70%"}
                onClose={drawerClose}
                destroyOnClose
                closeIcon={<SVGIcon icon="close" color={Config.themePrimaryBtn} />}
                {...rest}   // open Drawer

                footer={[
                    <Button
                        key="2"
                        htmlType="button"
                        className="cancelBtn"
                        onClick={drawerClose}
                    >
                        Cancel
                    </Button>,
                    <Button
                        key="1"
                        htmlType='submit'
                        type='primary'
                        form="addForm"
                        loading={saving}
                    >save</Button>
                ]}
            >
                <FormComponent
                    form={form}
                    id="addForm"
                    handleSubmit={handleFormSubmit}
                    onValuesChange={validateForm}
                ></FormComponent>
            </Drawer>
        </>
    )
}

export default AddComponent