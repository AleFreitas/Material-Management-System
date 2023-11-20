import Joi from 'joi';
import { parseISO, isValid } from 'date-fns';

const renewLoanSchema = Joi.object({
    new_date: Joi.string().required().regex(/^\d{4}-\d{2}-\d{2}$/).custom((value, helpers) => {
        const parsedDate = parseISO(value);
        if (!isValid(parsedDate)) {
            return helpers.error('any.invalid');
        }
        return value;
    }),
});

export{ renewLoanSchema }