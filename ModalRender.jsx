import { Modal } from 'antd';
import { useState, useEffect, cloneElement, useMemo, useCallback } from 'react';
import { extractFromObject } from './utils';

/**
 * Adds a component 
 * @param {Object} objModal The minimum config is: {title: 'Modal Title', content: <Component that will render inside the modal />}
 * @param {string} type "info" | "success" | "error" | "warning" | "confirm"
 * @param {Object} dependencies Object with the useState that we want to check to update the modal. If we pass a state that will change to the Modal props, we have to add it to the dependencies
 * @param {ReactComponentElement} trigger Component that will trigger the Modal
 */ 
const ModalRender = ({
    objModal = {},
    type = 'info',
    dependencies = {},
    trigger = <Button text='Open Modal' />,
    openModal: _openModal = false,
    className = ''
}) => {

    const _objModal = {
        title: 'Modal',
        content: <p>If you see this message, you're missing something in the objModal</p>,
        customButtons: false,
        ...objModal
    }

    const _dependencies = useMemo(() => extractFromObject(dependencies), [dependencies]);
    const [modal, setModal] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        _openModal && openModal();
    }, [_openModal]);

    useEffect(() => {
        open && updateModal();
    }, [_dependencies, open]);

    const openModal = useCallback(() => {
        const { customButtons, content } = _objModal;
        if ( customButtons ) {
            _objModal.cancelButtonProps = { style: { display: 'none' } };
            _objModal.okButtonProps = { style: { display: 'none' } };
        }

        const _content = cloneElement(content, { closeModal });

        _objModal.content = _content;
        _objModal.afterClose = closeModal;

        setModal(Modal[type]({
            className,
            destroyOnClose: true,
            maskClosable: true,
            afterClose: closeModal,
            ..._objModal
        }));

        setOpen(true);
    }, []);

    const closeModal = () => {
        if ( modal ) modal.destroy();
        setOpen(false);
    }

    const updateModal = () => {
        const { content, title } = _objModal;
        if ( modal ) modal.update({
            content: cloneElement(content, { closeModal }),
            title
        });
    }

    return trigger && cloneElement(trigger, {onClick: openModal})
}
export default ModalRender;