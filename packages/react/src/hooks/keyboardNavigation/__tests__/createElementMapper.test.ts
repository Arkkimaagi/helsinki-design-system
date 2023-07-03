import { ElementData, getArrayItemAtIndex } from '..';
import { createElementMapper } from '../createElementMapper';

function createDOM() {
  const div = document.createElement('div');
  // note ":scope" does not work with jsdom as expected
  // https://github.com/jsdom/jsdom/issues/3067
  // but it is used here to limit selector results, because ">" can be used after it
  div.innerHTML = `
    <ol class="list1">
      <li>list1 item 1</li>
      <li>list1 item 2</li>
    </ol>
    <ul class="list2">
      <li>
        <a class="list2Child">list2Child a 1</a>
        <button class="list2Child">list2Child button 1</button>
      </li>
      <li>
        <a class="list2Child">list2Child a 2</a>
        <nav class="subList1">
          <div>
            <a class="subListChild">subList1 a 1</a>
            <button class="subListChild">subList1 button 1</button>
          </div>
          <div>
            <a class="subListChild">subList1 a 2</a>
            <button class="subListChild">subList1 button 2</button>
          </div>
          <div>
            <a class="subListChild">subList1 item 3</a>
            <button class="subListChild">subList1 button 3</button>
          </div>
          <div>
            <a class="subListChild">subList1 item 4</a>
            <button class="subListChild">subList1 button 4</button>
          </div>
        </nav>
      </li>
      <li>
        <a class="list2Child">list2Child a 3</a>
        <button class="list2Child">list2Child button 3</button>
        <span>list2Child span 3</span>
      </li>
      <li>No children</li>
    </ul>
  `;
  return div;
}

const visibleElementBounds = {
  top: 1,
  height: 1,
  left: 1,
  width: 1,
  right: 1,
  bottom: 1,
  x: 0,
  y: 0,
  toJSON: () => {
    return {};
  },
};

describe('createElementMapper', () => {
  beforeAll(() => {
    jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(() => {
      return visibleElementBounds;
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  const verifyElementData = (
    data: ElementData,
    parentElement: Element,
    {
      index,
      elementIndex,
      type,
      focusableCount = 0,
      containerCount = 0,
    }: {
      index: ElementData['index'];
      type: ElementData['type'];
      containerCount?: number;
      focusableCount?: number;
      elementIndex?: number;
    },
  ) => {
    const elementPos = elementIndex === undefined ? index : elementIndex;
    expect(data.type).toBe(type);
    expect(data.index).toBe(index);
    expect(data.element).toBe(parentElement.children[elementPos]);
    if (!focusableCount) {
      expect(data.focusableElements).toBeUndefined();
    } else {
      expect(data.focusableElements).toHaveLength(focusableCount);
    }
    if (!containerCount) {
      expect(data.containerElements).toBeUndefined();
    } else {
      expect(data.containerElements).toHaveLength(containerCount);
    }
  };

  it('picks stuff', () => {
    const dom = createDOM();
    const mapper = createElementMapper(dom, {
      focusableElements: (el) => {
        return Array.from(el.querySelectorAll('ol.list1 li'));
      },
    });
    mapper.refresh();
    const root = mapper.getRootData() as ElementData;
    expect(root.type).toBe('root');
    expect(root.element).toBe(dom);
    expect(root.index).toBe(0);
    expect(root.focusableElements).toHaveLength(2);
    expect(root.containerElements).toBeUndefined();
    const focusables = root.focusableElements as ElementData[];
    const parent = dom.children[0];
    focusables.forEach((data, index) => {
      verifyElementData(data, parent, { index, type: 'focusable' });
    });
  });
  it('picks stuff 2', () => {
    const dom = createDOM();
    const mapper = createElementMapper(dom, {
      containerElements: (el) => {
        return Array.from(el.querySelectorAll(':scope > ul > li, :scope > nav'));
      },
      focusableElements: (root, path) => {
        // do not return focusables for root in this test
        // cannot use ":scope" to limit hits
        if (path.length < 2) {
          return [];
        }
        const el = getArrayItemAtIndex(path, -1)?.element as Element;
        return Array.from(el.querySelectorAll(':scope > a, :scope > button, :scope > div > *'));
      },
    });
    mapper.refresh();
    const root = mapper.getRootData() as ElementData;
    expect(root.type).toBe('root');
    expect(root.element).toBe(dom);
    expect(root.index).toBe(0);
    expect(root.containerElements).toHaveLength(4);
    expect(root.focusableElements).toBeUndefined();
    const containers = root.containerElements as ElementData[];
    const parent = dom.children[1];
    const focusableCounts = [2, 1, 2, 0];
    const containerCounts = [0, 1, 0, 0];
    containers.forEach((data, index) => {
      const focusableCount = focusableCounts[index];
      const containerCount = containerCounts[index];
      verifyElementData(data, parent, {
        index,
        type: 'container',
        focusableCount,
        containerCount,
      });
      if (containerCount > 0) {
        const childContainers = data.containerElements as ElementData[];
        const childParent = data.element as Element;
        childContainers.forEach((childData, childIndex) => {
          verifyElementData(childData, childParent, {
            index: childIndex,
            elementIndex: 1,
            type: 'container',
            focusableCount: 8,
            containerCount: 0,
          });
        });
      }
    });
  });
});
