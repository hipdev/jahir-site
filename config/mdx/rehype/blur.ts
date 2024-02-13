import type { Node } from 'unist';
import { visit } from 'unist-util-visit';

import { getBlurData } from './../../../src/utils/blur';

interface ImageNode {
  type: 'mdxJsxFlowElement' | 'element' | string;
  name: 'img' | string;
  tagName: 'img' | string;
  properties: {
    src: string;
    height?: number;
    width?: number;
    blurDataURL?: string;
    placeholder?: 'blur' | 'empty';
  } & Record<string, unknown>;
  attributes?: Array<{
    type: 'mdxJsxAttribute' | string;
    name: 'src' | string;
    value: unknown;
  }>;
  children?: Array<ImageNode>;
  parent?: ImageNode;
}

const getNodeType = (node: Node): { jsx?: boolean; img?: boolean } => {
  const img = node as ImageNode;
  const isJsxImage =
    img.type === 'mdxJsxFlowElement' &&
    (img.name === 'img' || img.name === 'Img');
  if (isJsxImage)
    return {
      jsx: Boolean(img.attributes?.find((it) => it.name === 'src')?.value),
    };
  const isNormalImage = img.type === 'element' && img.tagName === 'img';
  return {
    img:
      isNormalImage &&
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      img.properties &&
      typeof img.properties.src === 'string',
  };
};

const isImageNode = (node: Node): node is ImageNode => {
  const { jsx, img } = getNodeType(node);
  return jsx === true || img === true;
};

const getSrcFromImageNode = (
  node?: ImageNode,
): {
  src: string;
  width?: number;
  height?: number;
} | null => {
  if (!node) return null;
  const { jsx, img } = getNodeType(node);
  let src = '';
  let w = 0;
  let h = 0;
  if (jsx === true) {
    src =
      node.attributes?.find((it) => it.name === 'src')?.value?.toString() || '';
    w = Number(
      node.attributes?.find((it) => it.name === 'width')?.value?.toString() ||
        '0',
    );
    h = Number(
      node.attributes?.find((it) => it.name === 'height')?.value?.toString() ||
        '0',
    );
  } else if (img === true) {
    src = node.properties.src;
    w = node.properties.width || 0;
    h = node.properties.height || 0;
  }
  return {
    src: src.replace(/["']/g, '').replace(/%22/g, ''),
    width: w,
    height: h,
  };
};

const addProps = async (node: ImageNode): Promise<ImageNode> => {
  const { src, width, height } = getSrcFromImageNode(node) || {};
  if (!src) return node;
  const res = await getBlurData(src, width, height).catch(() => null);
  if (!res) return node;
  const { jsx, img } = getNodeType(node);
  if (jsx === true) {
    node.name = 'Img';
    const newProps = Object.keys(res).map((prop) => ({
      type: 'mdxJsxAttribute',
      name: prop,
      value: res[prop as keyof typeof res],
    })) as ImageNode['attributes'];
    const unique = [...(node.attributes || []), ...(newProps || [])].reduce(
      (prev, o) =>
        prev?.some((x) => x.name === o.name) ? prev : [...(prev || []), o],
      [] as ImageNode['attributes'],
    );
    node.attributes = unique;
  } else if (img === true) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    node.properties = { ...(node.properties || {}), ...res };
  }
  return node;
};

const imageBlurMetadata = () => {
  return async (tree: Node) => {
    const images: ImageNode[] = [];
    // Traverse elements
    visit(tree, ['mdxJsxFlowElement', 'element'], (node) => {
      const typedNode = node as ImageNode;
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (typedNode && isImageNode(typedNode)) images.push(typedNode);
    });
    for (const image of images) {
      await addProps(image);
    }
    return tree;
  };
};

export default imageBlurMetadata;
