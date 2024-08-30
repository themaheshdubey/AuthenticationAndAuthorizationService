class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            const result = await this.model.create(data);
            return result;
        } catch (error) {
            console.error("Error in CrudRepository create method:", error.message);
            throw error;
        }
    }

    async delete(id) {
        try {
            const result = await this.model.destroy({ where: { id } });
            if (result === 0) {
                console.warn(`No record found to delete with id ${id}`);
            }
            return result > 0;
        } catch (error) {
            console.error("Error in CrudRepository delete method:", error.message);
            throw error;
        }
    }

    async get(id) {
        try {
            const result = await this.model.findByPk(id);
            if (!result) {
                console.warn(`No record found with id ${id}`);
            }
            return result;
        } catch (error) {
            console.error("Error in CrudRepository get method:", error.message);
            throw error;
        }
    }

    async getAll(options = {}) {
        try {
            const result = await this.model.findAll(options);
            return result;
        } catch (error) {
            console.error("Error in CrudRepository getAll method:", error.message);
            throw error;
        }
    }

    async update(id, data) {
        try {
            const [updatedRowsCount, updatedRows] = await this.model.update(data, {
                where: { id },
                returning: true
            });
            if (updatedRowsCount === 0) {
                console.warn(`No record found to update with id ${id}`);
                return null;
            }
            return updatedRows;
        } catch (error) {
            console.error("Error in CrudRepository update method:", error.message);
            throw error;
        }
    }
}

module.exports = CrudRepository;
