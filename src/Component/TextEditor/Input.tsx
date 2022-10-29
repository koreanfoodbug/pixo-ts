import React, { useState, useEffect, PointerEventHandler } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    cursor: pointer;
    border: 2px solid orange;
    position: relative;
    min-height: 70px;
`;

const CloseIcon = styled.div`
    position: absolute;
    top: -10px;
    right: -10px;

     > div {
         position: relative;

         &::before {
            position: absolute;
            left: -20px;
            content: "";
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: orange;
         }

         &::after {
            display: inline-block;
            content: "\\00d7";
            position: absolute;
            top: -25px;
            right: 1px;
            scale: 0.6;
            color: white;
            font-size: 30pt;
         }
    }
`;

const Adjustment = styled.div`
    position: absolute;
    bottom: 6px;
    right: -13px;
    cursor: pointer;

     > div {
         position: relative;

         &::before {
            position: absolute;
            left: -20px;
            content: "";
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background-color: orange;
            z-index: 1;
         }

         &::after {
            position: absolute;
            top: -5px;
            left: -25px;
            content: "";
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: white;
            border: 2px solid orange;
         }
    }
`;

const StyledInput = styled.textarea<{ width: number; height: number }>`
    cursor: pointer;
    all: unset;
    padding: 0 15px;
    ${props => `width: ${props.width}px`};
    height: 100%;
    resize: none;
    overflow: hidden;
`;

interface Props {
    text: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    spanRef: React.RefObject<HTMLSpanElement>;
    spanRefForGetHeight: React.RefObject<HTMLSpanElement>;
    inputRef: React.RefObject<HTMLTextAreaElement>;
    revokeEditable: () => void;
    onDragMove: (e: PointerEvent) => void;
    height: number;
}

const Input: React.FC<Props> = ({
    text,
    onChange,
    spanRef,
    inputRef,
    revokeEditable,
    onDragMove,
    height,
}) => {
    const [width, setWidth] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        if (spanRef.current && width < spanRef.current?.offsetWidth) {
            setWidth(spanRef.current?.offsetWidth as unknown as number)
        }
    }, [text])

    const handlePointerDown: PointerEventHandler = (e) => {
        setIsDragging(true);
    };

    const handlePointerUp: PointerEventHandler = () => {
        setIsDragging(false);
    };

    const handlePointerMove = (e: any): void => {
        e.stopPropagation();
        if (isDragging) onDragMove(e);
    };

    return (
        <Wrapper style={{ height: `${height}px`, width: `${width + 30}px` }}>
            <CloseIcon onClick={() => revokeEditable()}>
                <div />
            </CloseIcon>
            <Adjustment
                onPointerDownCapture={handlePointerDown}
                onPointerUpCapture={handlePointerUp}
                onPointerMoveCapture={handlePointerMove}
                onPointerLeave={() => setIsDragging(false)}
            >
                <div />
            </Adjustment>
            <StyledInput
                value={text}
                onChange={onChange}
                width={width}
                ref={inputRef}
                height={height}
                onFocus={() => {
                    if (inputRef.current) {
                        const length = inputRef.current.value.length;
                        inputRef.current.setSelectionRange(length, length)
                    }
                }}
            />
        </Wrapper>
    );
};

export default Input;