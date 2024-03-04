/******************************************************************************
 * Copyright 2021 TypeFox GmbH
 * This program and the accompanying materials are made available under the
 * terms of the MIT License, which is available in the project root.
 ******************************************************************************/

import { type Module, inject } from 'langium';
import { createDefaultModule, createDefaultSharedModule, type DefaultSharedModuleContext, type LangiumServices, type LangiumSharedServices, type PartialLangiumServices } from 'langium/lsp';
import { ArithmeticsScopeProvider } from './arithmetics-scope-provider.js';
import { ArithmeticsValidator, registerValidationChecks } from './arithmetics-validator.js';
import { ArithmeticsGeneratedModule, ArithmeticsGeneratedSharedModule } from './generated/module.js';

/**
 * Declaration of custom services - add your own service classes here.
 */
export type ArithmeticsAddedServices = {
    validation: {
        ArithmeticsValidator: ArithmeticsValidator
    }
}

/**
 * Union of Langium default services and your custom services - use this as constructor parameter
 * of custom service classes.
 */
export type ArithmeticsServices = LangiumServices & ArithmeticsAddedServices

/**
 * Dependency injection module that overrides Langium default services and contributes the
 * declared custom services. The Langium defaults can be partially specified to override only
 * selected services, while the custom services must be fully specified.
 */
export const ArithmeticsModule: Module<ArithmeticsServices, PartialLangiumServices & ArithmeticsAddedServices> = {
    references: {
        ScopeProvider: (services) => new ArithmeticsScopeProvider(services)
    },
    validation: {
        ArithmeticsValidator: () => new ArithmeticsValidator()
    }
};

/**
 * Create the full set of services required by Langium.
 *
 * First inject the shared services by merging two modules:
 *  - Langium default shared services
 *  - Services generated by langium-cli
 *
 * Then inject the language-specific services by merging three modules:
 *  - Langium default language-specific services
 *  - Services generated by langium-cli
 *  - Services specified in this file
 *
 * @param context Optional module context with the LSP connection
 * @returns An object wrapping the shared services and the language-specific services
 */
export function createArithmeticsServices(context: DefaultSharedModuleContext): {
    shared: LangiumSharedServices,
    arithmetics: ArithmeticsServices
} {
    const shared = inject(
        createDefaultSharedModule(context),
        ArithmeticsGeneratedSharedModule
    );
    const arithmetics = inject(
        createDefaultModule({ shared }),
        ArithmeticsGeneratedModule,
        ArithmeticsModule
    );
    shared.ServiceRegistry.register(arithmetics);
    registerValidationChecks(arithmetics);
    if (!context.connection) {
        // We don't run inside a language server
        // Therefore, initialize the configuration provider instantly
        shared.workspace.ConfigurationProvider.initialized({});
    }
    return { shared, arithmetics };
}
