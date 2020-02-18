// @flow
import type {
  Module,
  Expression,
  LogicAction,
  Term,
} from '@expandorg/modules/src/form/model/types.flow';

type ModuleLogicMap = { [key: LogicAction]: ?Expression };

// eslint-disable-next-line import/prefer-default-export
export class ModuleLogic {
  static has(module: Module): boolean {
    return !!module.logic;
  }

  static get(module: Module): ModuleLogicMap {
    return module.logic || {};
  }

  static set(
    module: Module,
    action: LogicAction,
    expression: Expression
  ): Module {
    return {
      ...module,
      logic: {
        ...ModuleLogic.get(module),
        // $FlowFixMe
        [action]: expression,
      },
    };
  }

  static clear(module: Module): Module {
    if (!ModuleLogic.has(module)) {
      return module;
    }
    const { logic: __, ...modified } = module;
    return modified;
  }

  static unset(module: Module, action: LogicAction): Module {
    if (!ModuleLogic.has(module)) {
      return module;
    }
    const { [action]: _, ...logic } = ModuleLogic.get(module);

    if (!Reflect.ownKeys(logic).length) {
      const { logic: __, ...modified } = module;
      // $FlowFixMe
      return modified;
    }
    return { ...module, logic };
  }

  static cleanupTerm(term: Term): Term {
    if (Array.isArray(term)) {
      return term.map(t => ModuleLogic.cleanupTerm(t));
    }
    if (term === 'null') {
      // $FlowFixMe
      return null;
    }
    return term;
  }

  static cleanupExpr = (expr: Expression): Expression => {
    if (!expr || !Array.isArray(expr)) {
      return expr;
    }
    return expr
      .filter(term => !(Array.isArray(term) && term.length === 0))
      .map(term => ModuleLogic.cleanupTerm(term));
  };

  static cleanup = (module: Module): Module => {
    if (!module.logic) {
      return module;
    }
    const logic = Reflect.ownKeys(module.logic).reduce((updated, key) => {
      // $FlowFixMe
      updated[key] = ModuleLogic.cleanupExpr(module.logic[key]);
      return updated;
    }, {});
    return { ...module, logic };
  };
}
