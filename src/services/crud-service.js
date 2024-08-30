class CrudService {
    constructor(repository) {
        this.repository = repository;
    }

    async create(data) {
        try {
            const response = await this.repository.create(data);
            return response;
        } catch (error) {
            console.error("Error in CrudService create method:", error.message);
            throw error;
        }
    }

    async delete(id) {
        try {
            const response = await this.repository.delete(id);
            return response;
        } catch (error) {
            console.error("Error in CrudService delete method:", error.message);
            throw error;
        }
    }

    async get(id) {
        try {
            const response = await this.repository.get(id);
            return response;
        } catch (error) {
            console.error("Error in CrudService get method:", error.message);
            throw error;
        }
    }

    async getAll(options = {}) {
        try {
            const response = await this.repository.getAll(options);
            return response;
        } catch (error) {
            console.error("Error in CrudService getAll method:", error.message);
            throw error;
        }
    }

    async update(id, data) {
        try {
            const response = await this.repository.update(id, data);
            return response;
        } catch (error) {
            console.error("Error in CrudService update method:", error.message);
            throw error;
        }
    }
}

module.exports = CrudService;
