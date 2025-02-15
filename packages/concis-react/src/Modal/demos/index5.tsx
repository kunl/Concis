import React, { useState } from 'react';
import Modal from '..';
import Button from '../../Button';
import Space from '../../Space';

export default function index1() {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [loading, setLoading] = useState(false);

  const closeAsync = () => {
    setLoading(true);
    setTimeout(() => {
      setVisible2(false);
      setLoading(false);
    }, 2000);
  };

  return (
    <div>
      <Space>
        <Button handleClick={() => setVisible1(true)}>打开禁用按钮Modal</Button>
        <Button handleClick={() => setVisible2(true)}>打开自定义页脚Modal</Button>
        <Button handleClick={() => setVisible3(true)}>打开无页脚Modal</Button>
      </Space>

      <Modal
        title="Modal Title"
        visible={visible1}
        onCancel={() => setVisible1(false)}
        onOk={() => setVisible1(false)}
        okButtonProps={{ disabled: true }}
        cancelButtonProps={{ disabled: true }}
      >
        <p>
          You can customize modal body text by the current situation. This modal will be closed
          immediately once you press the OK button.
        </p>
      </Modal>
      <Modal
        title="Modal Title"
        visible={visible2}
        onCancel={() => setVisible2(false)}
        footer={
          <Space>
            <Button type="text" handleClick={() => setVisible2(false)}>
              Return
            </Button>
            <Button type="text" handleClick={closeAsync} loading={loading}>
              Async Return
            </Button>
            <Button type="primary" handleClick={() => setVisible2(false)}>
              Enter
            </Button>
          </Space>
        }
      >
        <p>
          You can customize modal body text by the current situation. This modal will be closed
          immediately once you press the OK button.
        </p>
      </Modal>
      <Modal
        title="Modal Title"
        visible={visible3}
        onCancel={() => setVisible3(false)}
        onOk={() => setVisible3(false)}
        footer={<></>}
      >
        <p>
          You can customize modal body text by the current situation. This modal will be closed
          immediately once you press the OK button.
        </p>
      </Modal>
    </div>
  );
}
