import {
  BaseCommand,
  Arg,
  RunnableArgs,
  renderTemplate,
  includeRelated,
} from 'angel-manager';

export default class Layout extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public commandName = 'make:layout';

  /**
   * Description of the command
   */
  public description = 'Makes a new Layout';

  /**
   * Liquid template path
   */
  public templatePath = 'layout';

  /**
   * Processed template destination path
   */
  public destinationPath = 'layout';

  /**
   * The extension of the component
   */
  public extension = 'tsx';

  /**
   * If true, the template will be generated inside componentName directory
   */
  public subDir = false;

  /**
   *
   * @returns an array of Arguments representing the arguments
   * to be passed to the command in the order they are defined
   */
  public args(): Arg[] {
    return [{ name: 'roleName', type: 'string' }];
  }

  public async run(args: RunnableArgs): Promise<void> {
    try {
      await renderTemplate(this, args);
      includeRelated(this, args, ['css']);
    } catch (error) {
      console.error();
    }
  }
}
