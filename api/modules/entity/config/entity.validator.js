'use strict';

const EntitySchema = require('../../../models/index').Entity.schema;
const ExampleSchema = require('../../../models/index').Example.schema;
const Joi = require('joi');
class EntityValidate {
    constructor() {

        this.findAll = {
            query: (() => {

                return {
                    size: Joi.number().description('Number of elements to return. Default 10')
                };
            })()
        };

        this.add = {
            payload: (() => {

                return {
                    entityName: EntitySchema.entityName.required(),
                    agent: EntitySchema.agent.required(),
                    usedBy: EntitySchema.usedBy,
                    examples: Joi.array().items({
                        value: ExampleSchema.value.required(),
                        synonyms: ExampleSchema.synonyms
                    }).required()
                };
            })()
        };

        this.findById = {
            params: (() => {

                return {
                    id: EntitySchema._id.required().description('Id of the entity')
                };
            })()
        };

        this.updateById = {
            params: (() => {

                return {
                    id: EntitySchema._id.required().description('Id of the entity')
                };
            })(),
            payload: (() => {

                return {
                    entityName: EntitySchema.entityName,
                    agent: EntitySchema.agent,
                    usedBy: EntitySchema.usedBy,
                    examples: Joi.array().items({
                        value: ExampleSchema.value.required(),
                        synonyms: ExampleSchema.synonyms
                    })
                };
            })()
        };

        this.deleteById = {
            params: (() => {

                return {
                    id: EntitySchema._id.required().description('Id of the entity')
                };
            })()
        };

    }
}

const entityValidate = new EntityValidate();
module.exports = entityValidate;
