import React, { ReactNode, useContext,
    useRef,
} from 'react';
import { 
   View,
   Modal,
   TouchableOpacity,
   GestureResponderEvent,
} from 'react-native';

import styles from './css';

// 弹窗显示
export default function IModal(props: {
    direction?: 'top' | 'center' | 'bottom',
    modalVisible: boolean,
    setModalVisible: Function,
    onRequestClose: () => void,
    children?: JSX.Element[] | JSX.Element, 
}) {
    const {modalVisible,
        setModalVisible,
        direction,
        children,
        onRequestClose, } = props;
    let justifyContent = 'center';
    const directions = {
        top: 'flex-start',
        center: 'center',
        bottom: 'flex-end',
    }
    if (direction) {
        justifyContent = directions[direction];
    }
    const handleClose = function(e:GestureResponderEvent) {
        e.preventDefault();
        e.stopPropagation();
        onRequestClose();
    };

    return <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={onRequestClose}
            >
                <TouchableOpacity 
                    onPress={handleClose}
                    style={{
                    justifyContent: justifyContent,
                    ...styles.modal
                    }}>
                    {children}
                </TouchableOpacity>
    </Modal>
}