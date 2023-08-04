import React from "react";

export const useAnchorPoint = (
  anchors: {
    [key: string]: string
  }) => {
  const [anchorPoint, setAnchorPoint] = React.useState<string | null>(null);

  React.useEffect(() => {
    // 使用 id 获取所有 anchors dom
    // 创建 IntersectionObserver 实例并传入回调
    // 通过回调获取当前可见的 anchor,并且 anchor 的一半在可视区域的上半部分
    // 则该 anchor 为当前可见的 anchor
    // 可见元素可能又多个，但只取离上半部分最近的一个

    const observer = new IntersectionObserver(([entry]) => {
      console.log(entry)
    }, {
      threshold: [1]
    });

    Object.keys(anchors).forEach((anchor) => {
      const anchorDom = document.getElementById(anchor);
      if (!anchorDom) {
        return;
      }

      observer.observe(anchorDom);
    })

    return () => {
      observer.disconnect();
    };
  }, [])

  return [anchorPoint, setAnchorPoint]
}
