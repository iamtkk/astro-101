class MiniIsland extends HTMLElement {
  static tagName = "mini-island";

  static attributes = {
    dataIsland: "data-island",
  };

  async connectedCallback() {
    await this.hydrate();
  }

  async hydrate() {
    const conditions = [];

    let conditionsAttributeMap = Conditions.getConditions(this);

    for (const condition in conditionsAttributeMap) {
      const conditionFunction = Conditions.map[condition];

      /**
       * condition ...
       * { idle: "", visible: "", media: "(max...)" }
       */
      if (conditionFunction) {
        const conditionPromise = conditionFunction(
          conditionsAttributeMap[condition],
          this
        );

        conditions.push(conditionPromise);
      }
    }
    // await condition promise
    await Promise.all(conditions);
    const relevantChildTemplates = this.getTemplates();
    this.replaceTemplates(relevantChildTemplates);
  }

  replaceTemplates(templates) {
    for (const node of templates) {
      console.log("THE NODE VALUE IS : ", node);
      console.log("THE NODE CONTENT IS : ", node.content);
      node.replaceWith(node.content);
    }
  }

  getTemplates() {
    return this.querySelectorAll(
      `template[${MiniIsland.attributes.dataIsland}]`
    );
  }
}

class Conditions {
  static map = {
    media: Conditions.waitForMedia,
    idle: Conditions.waitForIdle,
    visible: Conditions.waitForVisible,
  };

  static waitForMedia() {
    return new Promise((resolve) => resolve());
  }

  static waitForIdle() {
    return new Promise((resolve) => resolve());
  }

  static waitForVisible(value, node) {
    return new Promise((resolve) => resolve());
  }

  static getConditions(node) {
    let result = {};
    for (const condition of Object.keys(Conditions.map)) {
      //`client:${condition}`
      if (node.hasAttribute(`client:${condition}`)) {
        result[condition] = node.getAttribute(`client:${condition}`);
      }
    }
    /**
     * { idle: "", visible: "", media: "(max...)" }
     */
    return result;
  }

  static hasConditions(node) {
    const conditionAtrributeMap = Conditions.getConditions(node);

    return Object.keys(conditionAtrributeMap).length > 0;
  }
}

if ("customElements" in window) {
  window.customElements.define(MiniIsland.tagName, MiniIsland);
} else {
  console.error(
    "Island cannot be initiated because Window.customElements is unavailable"
  );
}
