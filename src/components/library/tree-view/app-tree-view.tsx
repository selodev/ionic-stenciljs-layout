import { Component, Host, h, Prop, State } from '@stencil/core';

const hasChildren = children => {
  return children && children.length;
};

@Component({
  tag: 'app-tree-view',
  styleUrl: 'app-tree-view.css',
  shadow: false,
})
export class AppTreeView {
  @State() expanded: any = {};
  @Prop() branches;
  @Prop() classNames;
  @Prop() level = 0;

  updateDropDown(id) {
    this.expanded = {
      ...this.expanded,
      [id]: this.expanded[id] ? !this.expanded[id] : true,
    };
  }
  render() {
    return (
      <Host
        class={this.classNames ? `tree-view ${this.classNames}` : 'tree-view'}
      >
        <ul>
          {this.branches.map((branch, index) => {
            const { name: branchName, children: branchChildren } = branch;
            let parent = `level-${this.level}-${index}`;
            let parentClass = this.expanded[parent]
              ? 'parent active'
              : 'parent';
            let childClass = this.expanded[parent]
              ? 'arrow down'
              : 'arrow right';
            return (
              <li
                key={`level-${this.level}-${index}`}
                id={`level-${this.level}-${index}`}
              >
                {hasChildren(branchChildren) ? (
                  <div>
                    <div
                      class={parentClass}
                      onClick={() => {
                        this.updateDropDown(parent);
                      }}
                    >
                      <div class={childClass}></div>
                      <div>{branchName}</div>
                    </div>
                    {hasChildren(branchChildren) && (
                      <app-tree-view
                        branches={branchChildren}
                        classNames="nested"
                        level={this.level + 1}
                      />
                    )}
                  </div>
                ) : (
                  <div>{branchName}</div>
                )}
              </li>
            );
          })}
        </ul>
        <slot></slot>
      </Host>
    );
  }
}
