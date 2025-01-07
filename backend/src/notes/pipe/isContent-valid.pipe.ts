import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { NoteType } from '../note-type.enum';

export function IsContentValid(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsContentValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const type = args.object['type'];

          if (type === NoteType.TEXT) {
            return validateTextContent(value);
          }

          if (type === NoteType.LIST) {
            return validateListContent(value);
          }

          return true;
        },
        defaultMessage(args: ValidationArguments): string {
          const type = args.object['type'];
          if (type === NoteType.TEXT) {
            return 'textContent is required when type is TEXT';
          }
          if (type === NoteType.LIST) {
            return 'listContent is required when type is LIST';
          }
          return 'Invalid content for the given type';
        },
      },
    });
  };
}

function validateTextContent(value: any): boolean {
  return !!value;
}

function validateListContent(value: any): boolean {
  return Array.isArray(value) && value.length > 0;
}
