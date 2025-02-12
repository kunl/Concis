import React, { FC, useState, useMemo, useContext, useEffect, memo, useRef } from 'react';
import { CloseOutlined, EyeOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';
import { ctx } from '../Form';
import { GlobalConfigProps } from '../GlobalConfig/interface';
import cs from '../common_utils/classNames';
import { globalCtx } from '../GlobalConfig';
import './index.module.less';

interface InputProps {
  /**
   * @description 类名
   */
  className?: string;
  /**
   * @description 自定义宽度
   * @default 170px
   */
  width?: string;
  /**
   * @description 自定义样式
   * @default {}
   */
  moreStyle?: object;
  /**
   * @description 输入框类型
   * @default text
   */
  type?: string;
  /**
   * @description 提示
   * @default ''
   */
  placeholder?: string;
  /**
   * @description 显示清空按钮
   * @default false
   */
  showClear?: boolean;
  /**
   * @description 显示密码切换按钮(需同时设置type="password")
   * @default false
   */
  showTogglePwd?: boolean;
  /**
   * @description 数字框最小值
   * @default ''
   */
  min?: number;
  /**
   * @description 数字框最大值
   * @default ''
   */
  max?: number;
  /**
   * @description 数字框递增/减值
   * @default 1
   */
  step?: number;
  /**
   * @description 文本域内容最大长度
   */
  maxLength?: number;
  /**
   * @description 是否展示字数
   * @default false
   */
  showCount?: boolean;
  /**
   * @description 输入框内容改变回调
   */
  handleIptChange?: Function;
  /**
   * @description 输入框聚焦回调
   */
  handleIptFocus?: Function;
  /**
   * @description 输入框点击回调
   */
  handleClick?: Function;
  /**
   * @description 输入框失去焦点回调
   */
  handleIptBlur?: Function;
  /**
   * @description 输入框键盘监听
   */
  handleKeyDown?: Function;
  /**
   * @description 数字框内容改变回调
   */
  handleNumChange?: Function;
  /**
   * @description 清空回调
   */
  clearCallback?: Function;
  /**
   * @description 默认内容
   * @default ''
   */
  defaultValue?: string;
  isFather?: boolean;
}

type NativeInputProps = Omit<React.InputHTMLAttributes<HTMLElement>, 'type'>; //原生Input接口
const Input: FC<InputProps & NativeInputProps> = (props) => {
  const {
    className,
    width,
    moreStyle,
    type,
    placeholder,
    showClear,
    showTogglePwd,
    min,
    max,
    step,
    handleIptChange,
    handleKeyDown,
    handleIptFocus,
    handleClick,
    handleIptBlur,
    handleNumChange,
    clearCallback,
    defaultValue,
    isFather = false,
  } = props;
  const [iptValue, setIptValue] = useState<string | number>(defaultValue || '');
  const [pwdIptState, setPwdIptState] = useState(true); //密码框切换状态

  const { input, prefixCls, darkTheme } = useContext(globalCtx) as GlobalConfigProps;

  const classNames = cs(prefixCls, className, `concis-${darkTheme ? 'dark-' : ''}input`);

  const formCtx: any = useContext(ctx);
  const iptRef = useRef(null);

  useEffect(() => {
    //用于监听Form组件的重置任务
    if (formCtx.reset) {
      setIptValue('');
    }
  }, [formCtx.reset]);
  useEffect(() => {
    if (formCtx.submitStatus && !isFather) {
      formCtx.getChildVal(iptValue);
    }
  }, [formCtx.submitStatus]);

  const changeIpt = (e: React.ChangeEvent<HTMLInputElement>) => {
    //改变文本框
    if (moreStyle && Object.keys(moreStyle).includes('caretColor')) {
      return;
    }
    setIptValue(e.target.value);
    if (handleIptChange) {
      handleIptChange(e.target.value);
    }
  };
  const blurIpt = () => {
    //失去焦点
    if (type === 'num' && Number(iptValue) == NaN) {
      setIptValue('');
    }
    handleIptBlur && handleIptBlur();
  };
  const focusIpt = () => {
    handleIptFocus && handleIptFocus(iptValue);
  };
  const iptHandleClick = () => {
    handleClick && handleClick();
  };
  const addNum = () => {
    //加
    if (type === 'num' && Number(iptValue) == NaN) {
      return setIptValue('');
    }
    const stepNum = step || 1;
    if (step && max && Number(iptValue) + stepNum > max) {
      handleNumChange && handleNumChange(max);
      return setIptValue(max);
    }
    if (step && min && Number(iptValue) + stepNum < min) {
      handleNumChange && handleNumChange(min);
      return setIptValue(min);
    }
    handleNumChange && handleNumChange(Number(iptValue) + stepNum);
    setIptValue(Number(iptValue) + stepNum);
  };
  const lowNum = () => {
    //减
    if (type === 'num' && Number(iptValue) == NaN) {
      return setIptValue('');
    }
    const stepNum = step || 1;
    if (step && min && Number(iptValue) - stepNum < min) {
      handleNumChange && handleNumChange(min);
      return setIptValue(min);
    }
    handleNumChange && handleNumChange(Number(iptValue) - stepNum);
    setIptValue(Number(iptValue) - stepNum);
  };
  const iptType = useMemo(() => {
    if (showTogglePwd && type === 'password') {
      return pwdIptState ? 'password' : 'text';
    }
    return type || 'text';
  }, [type, showTogglePwd, pwdIptState]);
  const exticStyle = useMemo(() => {
    let style = { width: '170px' };
    if (width) {
      style.width = width + 'px';
    }
    return { ...style, ...moreStyle };
  }, [width, moreStyle]);
  return (
    <div
      className={classNames}
      style={{ width: width ? width + 'px' : '170px', '--global-color': input || '#8fb6d8' } as any}
    >
      <input
        className="input"
        style={exticStyle}
        type={iptType}
        placeholder={placeholder}
        value={defaultValue || iptValue}
        onChange={changeIpt}
        onBlur={blurIpt}
        onFocus={focusIpt}
        onKeyUp={(e) => handleKeyDown && handleKeyDown(e)}
        onClick={iptHandleClick}
        ref={iptRef}
      />
      {
        //可清除
        (showClear && (
          <CloseOutlined
            style={{
              position: 'absolute',
              right: '0',
              fontSize: '12px',
              cursor: 'pointer',
              padding: '0 5px',
            }}
            onClick={(e) => {
              e.stopPropagation();
              setIptValue('');
              clearCallback && clearCallback();
            }}
          />
        )) ||
        //密码框
        (type === 'password' && showTogglePwd && (
          <EyeOutlined
            style={{ position: 'absolute', right: '5px', fontSize: '12px', cursor: 'pointer' }}
            onClick={() => setPwdIptState(!pwdIptState)}
          />
        )) ||
        //数字框
        (type === 'num' && (
          <div className="numTags">
            <UpOutlined style={{ cursor: 'pointer', fontSize: '10px' }} onClick={addNum} />
            <DownOutlined style={{ cursor: 'pointer', fontSize: '10px' }} onClick={lowNum} />
          </div>
        ))
      }
    </div>
  );
};
export default memo(Input);
