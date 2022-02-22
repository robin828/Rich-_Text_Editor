import styles from "../styles/Editor.module.css";
import logo from "../public/logo-02.png";
import setting from "../public/setting.png";
import s1 from "../public/spe_1.png";
import isHotkey from "is-hotkey";

import s2 from "../public/spe_2.png";
import s3 from "../public/spe_3.png";
import textcolor from '../public/textcolor.png';
import highlight from '../public/highlight.png';
import Image from "next/image";
import React, { useState, useCallback, useMemo } from "react";
import { createEditor, Editor, Transforms, Text } from "slate";
import { Slate, Editable, withReact, useSlate, useSelected, useFocused } from "slate-react";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
// import Button from "@material-ui/lab/Button";import ColorPicker from 'material-ui-color-picker'
import ColorPicker from "material-ui-color-picker";

import Divider from "@material-ui/core/Divider";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import CodeIcon from "@material-ui/icons/Code";
import LooksOneIcon from "@material-ui/icons/LooksOne";
import LooksTwoIcon from "@material-ui/icons/LooksTwo";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";

const image = ({ attributes, element, children }) => {
    const selected = useSelected();
    const focused = useFocused();
  
    return (
      <div
        {...attributes}
        className={clsx("element-image", { highlight: selected && focused })}
      >
        <div contentEditable={false}>
          <img alt={element.alt} src={element.src} />
        </div>
        {children}
      </div>
    );
  };
export const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
      case "image":
        <image {...props} />
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];
const withImage = (editor) => {
    const { isVoid } = editor;
  
    editor.isVoid = (element) =>
      element.type === "image" ? true : isVoid(element);
  
    return editor;
  };
const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);
  console.log(isList);

  Transforms.unwrapNodes(editor, {
    match: (n) => LIST_TYPES.includes(n.type),
    split: true,
  });

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === format,
  });
  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};
const BlockButton = ({ format, children }) => {
  const editor = useSlate();
  return (
    <Box ml={1} mt={1}>
      <Button
        value={format}
        selected={isBlockActive(editor, format)}
        onMouseDown={(event) => {
          event.preventDefault();
          toggleBlock(editor, format);
        }}
        style={{ lineHeight: 1 }}
      >
        {children}
      </Button>
    </Box>
  );
};

const MarkButton = ({ format, children }) => {
  const editor = useSlate();//   alert("**");
  return (
    <Button
      value={format}
      selected={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {children}
    </Button>
  );
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) children = <strong>{children}</strong>;
  if (leaf.code) children = <code>{children}</code>;
  if (leaf.italic) children = <em>{children}</em>;
  if (leaf.underline) children = <u>{children}</u>;
  if (leaf.color) children = <span style={{ color: "red" }}>{children}</span>
  if (leaf.highlight) children = <span style={{ background: "red" }}>{children}</span>
  return <span {...attributes}>{children}</span>;
};
export const editor = () => {
    const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [
        {
          text: "There are many variations of Lorem Ipsum but the majority have suffered alteration There are many variationpassages of Lorem Ipsum available, but the majority have salterationin some form, by injected humour, or randomised wowhich don't look even slightly believable. If you are going to use a passage. There are many variations of Lorem Ipsum butthe majority have suffered alteration There are many variationpassages of Lorem Ipsum available, but the majority have salteration in some form, by injected humour, orrandowowhich don't look even slightly believable. If you are going to use a passage.",
        },
      ],
    },
  ]);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);
  const HOTKEYS = {
    "mod+b": "bold",
    "mod+i": "italic",
    "mod+u": "underline",
    "mod+`": "code",
  };

  const data  = [
      {img:s1,heading:'Speaker 1',text: 'There are many variations of Lorem Ipsum but the majority have suffered alteration There are many variationpassadont look even slightly believable. If you are going to use a passage.'},
      {img:s2,heading:'Speaker 1',text: 'There are many variations of Lorem Ipsum but the majority have suffered alteration There are many variationpassadont look even slightly believable. If you are going to use a passage.'},
      {img:s3,heading:'Speaker 1',text: 'There are many variations of Lorem Ipsum but the majority have suffered alteration There are many variationpassadont look even slightly believable. If you are going to use a passage.'},

  ]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Image
            //   loader={myLoader}
            src={logo}
            alt="Picture of the author"
            width={30}
            height={30}
          />
          <span className={styles.vertical}></span>
          <p className={styles.logoText}>Data</p>
        </div>

        <Image
          //   loader={myLoader}
          src={setting}
          alt="Picture of the author"
          width={50}
          height={50}
        />
      </div>
      <div className={styles.main}>
        <Typography style={{color:'#091E42', fontSize: 36, fontFamily: 'Roboto'}} >John Doe Interview</Typography>
      </div>
      <div
        style={{ paddingLeft: "5rem", paddingRight: "5rem", margin: "3rem" }}
      >
        <Slate
          editor={editor}
          value={value}
          onChange={(value) => setValue(value)}
        >
          <AppBar position="static" style={{ background: "#FAFBFC" }}>
            <Toolbar>
              <MarkButton format="bold">
                <FormatBoldIcon />
              </MarkButton>
              <MarkButton format="italic">
                <FormatItalicIcon />
              </MarkButton>
              <MarkButton format="underline">
                <FormatUnderlinedIcon />
              </MarkButton>
              <MarkButton format="color">
                  {/* <img src={textcolor} /> */}
                  <Image
            //   loader={myLoader}
            src={textcolor}
            alt="Picture of the author"
            width={30}
            height={30}
          />
              </MarkButton>
              <MarkButton format="highlight">
              {/* <img src={highlight} /> */}
              <Image
            //   loader={myLoader}
            src={highlight}
            alt="Picture of the author"
            width={30}
            height={30}
          />
              </MarkButton>
              {/* <MarkButton format="start-align">start</MarkButton>
              <MarkButton format="center">center</MarkButton>
              <MarkButton format="link">link</MarkButton> */}
              <MarkButton format="code">
                <CodeIcon />
              </MarkButton>
              <BlockButton format="heading-one">
                <LooksOneIcon />
              </BlockButton>
              <BlockButton format="heading-two">
                <LooksTwoIcon />
              </BlockButton>
              <BlockButton format="block-quote">
                <FormatQuoteIcon />
              </BlockButton>
              {/* <BlockButton format="image">
                Image
              </BlockButton> */}
              <BlockButton format="numbered-list">
                <FormatListNumberedIcon />
              </BlockButton>
              <BlockButton format="bulleted-list">
                <FormatListBulletedIcon />
              </BlockButton>
            </Toolbar>
          </AppBar>
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            onKeyDown={(event) => {
              for (const hotkey in HOTKEYS) {
                if (isHotkey(hotkey, event)) {
                  event.preventDefault();
                  const mark = HOTKEYS[hotkey];
                  toggleMark(editor, mark);
                }
              }
            }}
          />
        </Slate>
      </div>
      <div style={{display:'flex', alignItems: 'center', justifyContent: 'center'}} >
      <div style={{maxWidth:750}} >
          {
              data?.map(dat=>(
                <Card >
                <CardHeader
                style={{margin: 2, backgroundColor: '#FAFBFC'}}
                  avatar={
                    <Avatar sx={{ backgroundColor: '#FA5523' }} aria-label="recipe" />
                  }
                  title={dat.heading}
                //   onClick={()=>handleClick(mes)}
                //   onClick={(mes)=>ha}
                  subheader={dat.text}
                />
                </Card>
              ))
          }
      
      </div>
      </div>
      
    </div>
  );
};

export default editor;
