import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Input from './Input';
import DragMove from '../DragMove';

interface Props {
    fontSize: number;
    top: number;
    right: number;
    initialText: string;
}

const Wrapper = styled.div<Omit<Props, 'initialText'>>`
    cursor: pointer;
    position: absolute;
    top: ${(props) => props.top}px;
    color: #433D3C;
    font-size: ${(props) => props.fontSize}px;
    right: ${(props) => props.right}%;
`;

const Text = styled.span<{ editable?: boolean; hide?: boolean }>`
    ${props => props.editable && 'opacity: 0'};
    ${props => props.hide &&
        'opacity: 0; position: absolute;'
    }
    white-space: pre-line;
`;

const TextEditor: React.FC<Props> = ({ fontSize, top, right, initialText }) => {
    const [text, setText] = useState(initialText)
    const [editable, setEditable] = useState(false)
    const spanRef = useRef<HTMLSpanElement>(null);
    const spanRefForGetHeight = useRef<HTMLSpanElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (spanRefForGetHeight.current && spanRefForGetHeight.current.textContent?.slice(-1) === '\n') {
            const arr = spanRefForGetHeight.current?.textContent.split(/\r?\n/);
            const length = arr.length - 1
            setHeight((spanRefForGetHeight.current?.offsetHeight / length) * (length + 1))
            return
        }

        if (spanRefForGetHeight.current) {
            setHeight(spanRefForGetHeight.current?.offsetHeight)
        }
    }, [text])

    const [translate, setTranslate] = useState({
        x: 0,
        y: 0,
    });

    const [translateForRotate, setTranslateForRotate] = useState({
        rotateDeg: 0,
    });

    const revokeEditable = () => { setEditable(false) };
    const toggleEditable = () => { setEditable(!editable) };

    useEffect(() => {
        if (editable) {
            inputRef.current?.focus();
        }
    }, [editable]);

    const handleDragMove = (e: PointerEvent) => {
        setTranslate({
            x: translate.x + e.movementX,
            y: translate.y + e.movementY,
        })
    }

    const handleDragMoveForRotate = (e: PointerEvent) => {
        const rect = wrapperRef.current?.getBoundingClientRect();
        const wrapperLeft = rect?.left as number;
        const wrapperWidth = rect?.width as number;
        const wrapperTop = rect?.top as number;
        const wrapperHeight = rect?.height as number;

        const WrapperCenterX = wrapperLeft + (wrapperWidth / 2);
        const WrapperCenterY = wrapperTop + (wrapperHeight / 2);

        const dx = e.clientX - WrapperCenterX;
        const dy = e.clientY - WrapperCenterY;

        let degree = Math.atan2(dy, dx) * 180 / Math.PI;

        setTranslateForRotate({
            rotateDeg: degree,
        })
    }

    const getLongLineInText = () => {
        const spanTextArr = text.split(/\r?\n/);
        const spanTextLengthArr = spanTextArr.map(v => v.length)
        const max = Math.max(...spanTextLengthArr);
        const index = spanTextLengthArr.indexOf(max);
        return spanTextArr[index];
    };

    return (
        <DragMove onDragMove={handleDragMove} toggleEditable={toggleEditable}>
            <Wrapper
                top={top}
                fontSize={fontSize}
                right={right}
                style={{
                    transform: `translateX(${translate.x}px) translateY(${translate.y}px) rotate(${translateForRotate.rotateDeg}deg)`, zIndex: 3
                }}
                ref={wrapperRef}
            >
                <>
                    {editable && (
                        <Input
                            height={height}
                            spanRef={spanRef}
                            text={text}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                setText(e.target.value)
                            }}
                            inputRef={inputRef}
                            revokeEditable={revokeEditable}
                            onDragMove={handleDragMoveForRotate}
                            spanRefForGetHeight={spanRefForGetHeight}
                        />
                    )}
                    <Text
                        ref={spanRef}
                        hide={true}
                    >
                        {getLongLineInText()}
                    </Text>
                    <Text ref={spanRefForGetHeight} editable={editable}>{text}</Text>
                </>
            </Wrapper>
        </DragMove>
    );
};

export default TextEditor;