/*
 * Note - jQuery plugin for register note 
 *
 * Author: will
 * Contributors: Dan G. Switzer, II
 * Parts of this plugin are inspired by Joern Zaefferer's Tooltip plugin
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Version: v1
 * Date: 16 July 2011
 *
 * For documentation visit http://www.jiayuan.com
 *
 */

(function($) {

    var note_html = '<div class="layerBorder" style="display:none">'+
					 '<div id="con">'+
						'<div class="layerTitle"><h3>内心独白示例</h3><a class="close" href="javascript:void(0)"></a></div>'+
						'<ul id="tags"></ul>'+
						'<div id="tagContent"></div>'+
					 '</div>'+
					'</div>';
 var fm=["等待的的心承受了太多的孤独，当有一个港湾等待他（她）停靠的时候，他（她）还有什么理由不去摆脱那些身心疲惫。等待你给我港湾，给我温暖，我相信一生平淡的守护远比那些轰轰烈烈的爱情散发的幸福更甜而久。",
"爱一个人意味着什么呢？这意味着为他的幸福而高兴，为使他能够幸福而去做需要做的一切，并从这当中得到快乐。一般的宿命，就是我们总会遇见一些人遭遇一些事。然后，看着命中注定的事发生，却无能为力。而我的宿命就是遇到了你，一眨眼一瞬间凝固停止延续到永远。",
"生活常和我们开着玩笑，你期待什么，什么就会离你越远；你执着于其中，就会被其伤害得愈深。做事不必太期待，坚持不必太执着；学会放下，放下不切实际的期待，放下没有结果的执着。",
"如果一件东西，踮起脚就能够着了，你就去够；如果站在那里不断的使劲跳起来也还是够不着，那就别够了，没必要把自己搞的那么累。爱情，亦是如此吧。凡事要看开一些，看透一些，什么都在失去，什么都留不住，唯有当下的快乐与幸福最真实。",
"我期待这样的你：这一生任何时候你都一直紧紧的牵住我的手让我相信天长地久。当我白发苍苍躺在你怀里 ，将合上双眸的时候，你愿意和我一起握住这一生爱的玫瑰，陪我从人间走到天堂。",
"不是每个擦肩而过的人都会相识，也不是每个相识的人都会让人牵挂。至少我们在今生，在那个地方，在一转身的时候没有错过。在我们双眼相望的时候，在眼中找到了爱的缘份。若大的地球上能和你相遇真的不容易，感谢上天给了我们这次相识，相恋的缘份！",
"有一种爱，长久且让人心醉，有一种情，伤人且自伤。有一种蛊被称为一味相思，让人不由沉醉且相思入骨。爱情就是两个人在一起不离不弃，执子之手，与子偕老；爱情是无私的给予，没有任何条件；爱情是没有怨恨，无畏的等待。",
"在我眼里，爱情不仅仅需要的是信任，更多的是执着，对生活的执着，对希望的执着，对生命的执着，这都是支撑爱情的基础，让爱情之花从尘埃里开出来，绚烂绽放。",
"找一个人开始爱情长跑，到爱情可以变成亲情的时候。我想你，牵我的手，为我庞起长发，走进婚姻的神殿。",
"让我为你戴你上银白色的钻戒，让我为你穿上白色的礼服，想为早起的你挤牙膏，想为晚起的你做早餐，与你在夕阳下散步，让我守在你的身边一生一世。",
"不要因为寂寞爱错人，更不要因为爱错人而寂寞一生，尝试信任才能得到幸福。缘分是本书，翻的不经意会错过，读的太认真会流泪。",
"我的爱情不要暧昧，不要游戏，不要借口，不要谎言，不要灰色地带，不要挖空心思，不要不见天日，不要拖泥带水，不要顾左右而言他，更不要所谓的三人行。",
"有的人与人之间的相遇就像是流星，瞬间迸发出令人羡慕的火花，却注定只是匆匆而过。时间会慢慢沉淀，有些人会在你心底慢慢模糊。然而我却想我在你心里是唯一，是永垂不朽。",
"什么样的男人，就找什么样的女人；婚姻千万不能随意。自爱才能赢得自尊；爱情也是一种态度。不找完美的，只找独特的。优秀的人在一起不一定快乐，适合的人在一起最幸福！",
"昨天的事情今天不重播，今天的事情导演不叫cut，明天的事情我要和你一起去编辑，拍出奥斯卡都望尘莫及的经典大片。",
"爱情就像是候车站牌，有人来有人去，我的心就是一个站牌，写着等待。不想再一个人孤独的走着，希望遇见生命中的另一半。",
"我在等一个人，一个可以把我的寂寞画上休止符的人；一个可以陪我听遍所有悲伤的情歌却不会让我想哭的人；一个我可以在他身上找出一百个缺点却还是执意要爱的人；一个会对我说：我们有坑一起跳，有苦一起尝，有一辈子就一起过的人！",
"岁月在流逝，只想找个和我相携一生的伴侣，那是最美的风景：一杯浓浓的咖啡，露台上的两把藤椅上两个慢慢老去的爱人，迟暮但安详。 ",
"爱在左，情在右，走在生命的两旁，随时撒种，随时开花，将这一径长途点缀得花香弥漫。我想谈一场永不分手的恋爱，蹒跚漫步，夕阳西下，白头到老，相濡以沫。",
"爱情,就是双手捧握着的沙子,握得过紧或过松,手里的沙子都会流失,只有用心捧握,沙子才不流失,爱情才能长久。我愿与你一同经历爱情，经历美好。",
"你说，你在大海的尽头。我说，我要把你找寻。于是，单纯的心踏上了爱情征途，开始了颠沛流离的生活。时间慢慢的消逝，岁月渐渐的流失，亲爱的你何时出现？",
"我，阳光，随意，勤勉，又有完美的生活目标，生活在这个世界上。你，只求如同一阵清新的空气，让我呼吸于中，融为一体。",
"恋爱就像看电视，手握遥控器，充满期待地等待好节目，最后精疲力竭倒头睡去，然而第二天你还忍不住要来等。我等的就是那个让我忍不住回来的你。",
"生命中，不断的有人离开或进入，看见的、看不见的，记住的、遗忘的；生命中，不断的有得失和失落，看不见的、看见的；遗忘的、记住的。但我希望有你在生命里。",
"感情上若习惯防备，寂寞就多一道墙围，爱情隐隐约约提醒我这一回：再不拥抱就是罪！我站在绝望的边缘，摇摇欲坠……我只希望能有个自己的港湾，我只希望能有份永恒的爱恋，爱，快一点，快一点，来到我的身边。",
"婚姻是勤劳者的福利，是懒惰者的枷锁，是堕落者的镣铐，是愉乐者的救命草，是浪子回归的家园，是芸芸众生者的心灵归属。我想与你一同找寻这份归属。",
"谁说爱情是寂寞者的谎言，忠诚者的戏言，单身汉的慌不择言。爱情是永恒的，一分钟也永恒，一秒钟也永恒，它在记忆中备份着也足够。",
"恋爱就象吃辣椒，不吃的时候它总是奇香无比，但真正吃的时候却辣的你痛不欲生，后悔莫及，发誓永不再吃，然而辣劲刚过，你又对它朝思暮想。越辣越香，越香越辣，你永远在思念与后悔之间游离，这就是恋爱的逻辑。",
"你是我心目中最美丽的钻石，当太阳月亮和地球汇聚成一线时、也就是在我的世界即将落幕的时候你出现了，像一颗流星般划过我的生命里，我的生命就此被你点燃了，我的心也在此刻被你照亮了。",
"我燃起生命的火花，等待着你来陪我一起走过美好的明天，江山如此美丽，但是如果没有你的陪伴，那对我将会是毫无意义，只要有你的地方就会星光熠熠，我也只要有你才会觉得世界如此美丽、生命如此可爱。"];

var male = ["小胜凭智，大胜凭德。万法随缘,自然而然。好婚姻没有固定模式。但进入一段好的婚姻之前，一定要先了解自我。要选择最合适自己的，而不是最好的。不要有太多的条条框框，放低一个标准可能回收获更多的幸福。",
"每天简单地工作，简单地跑步，简单地在大街马路上四处张望看漂亮美眉，然后转身回家听下乡村音乐。听到情深处，不禁就嘁嘁暧暧自言自语念叨两句：我怎么还没女朋友啊。",
"我容易相处，为人实在，低调做人，踏实做事，懂得照顾呵护自己的女人是我最大的优点。习惯换位思考，只是些许大男子主义，不过也仅限于很偶然的那么几天，算是男性每个月的生理期，俗称大姨夫。性格开朗温顺的我是你值得信任和依靠托付一生的人。",
"去爱吧，像不曾受伤一样；跳舞吧，像没人欣赏一样；唱歌吧，像没人聆听一样；生活吧，像每天是末日一样；学习吧，像生命没有尽头一样；珍惜吧，像从未曾得到过一样！",
"不要觉得自己的过去受到了很深的伤害，从此就不敢也没有能力再爱。这世界上有那么多的人，每一个人的人生都是不同的，发生在他们身上的感情也会不同。",
"一百个人会有一百种对爱情的定义。我的爱情解读不了你的爱情，同样的，过去失败的情感，一样不该影响到未来属于你的人生。",
"谁也不是先知，谁也不知道我们下一次的付出，是否真的可以得到同等的回报。但是我相信上帝对每个人都是公平的。当他拿走你一样东西的时候，一定会为你带来另一种幸福和好运。",
"被一个不爱你的人抛弃，事实上是一种幸运。而放弃一个真心爱你的人，留给自己的却可能是一辈子无法挽回的遗憾。为一个伤害了你的人哭泣是不值得的，因为真正值得你流泪的人是永远不会让你哭。",
"总是任性的想要去寻找一种命定的缘分，就如同寻找一片脉络与掌心的纹路相同的叶子一样。那都是可遇而不可求的。生活的可贵在于珍惜，而珍惜源自于对幸福的把握。",
"想象远不及生活的步伐遥远，绕了一个弯，也许又回到起点，或者改道走向下一个终点。人总要有很多经过，绚烂过、懵懂过、付出过、得到过、失去过、庆幸过、遗憾过、失望过、满足过，每个人也就在这些经历中浓缩出精彩的人生。",
"不要因为怕被伤害就不再去爱。如果不曾心动，又怎么能够体会思念的美好？如果不曾真心爱过，又怎知痛也是一种爱到极致？不要太在乎是不是会再次受伤，因为你曾经拥有的快乐已经是经过所赋予你的最美好的礼物。受过伤害的你也该敞开胸怀，我在这里等着你。",
"不要害怕离去，因为你曾经拥有了幸福。保持微笑，不再忧伤，太过小心翼翼的人生是无法看到生活的美丽的。我愿与你一起微笑，一同悲伤，携手美丽人生。",
"不要太在乎一些无伤大雅的细节，有时候放开一些反而会让你得到更多。不拘小节的人容易得到快乐，和不拘小节的人一起生活是一个轻松自由人生的开始，牵住我的手，让我带你走。",
"幸福是什么？幸福就是以一种悄无声息的方式温柔的渗透，然后蔓延。即使沉溺于那些揪心的感伤，也要用力的明媚微笑！你在我眼中是最美，我要你是我幸福的可爱女人。",
"性：男，好：女。没破事，没洁癖，巨简单，善恶搞。讲义气，重感情。不拜金，不势力，乐天派，爱家长，爱干净，爱工作，喜竞技，爱足球。情专一，善做饭，常家务，轻自恋，不打扮。人低调，不吝啬，好面子。很简单的一个人，你懂的。",
"对整个世界来说，你是一个人，而对一个人来说，你就是整个世界。我会在这里等着你的到来，期待我们的爱情开花结果，期待把我们的小窝布置得浪漫温馨，一回到家就有幸福的感觉。",
"我想用我的真心换你我一生幸福的生活！还没找到你怎么办呢？其实无所谓合适不合适，重要在于，你是否愿意为对方包容，你是否把中心放在他身上，愿我就是你的天，你的肩膀，你的依靠。",
"我相信，我会找到我的百分百女孩的。这是给自己定的目标。时间渐渐地磨平了我的冲动，冲淡了我的激情，抹杀了我的爱。也许你的出现能让我豁然开朗，所以等待你的出现。",
"其实，你喜欢一个人，就像喜欢富士山。你可以看到它，但是不能搬走它。你有什么方法可以移动一座富士山呢？回答是，你自己走过去。爱情也是如此。",
"当年迈的Karen用直硬的丹麦英语追忆非洲大草原上与Denys的历历往昔，当Darcy在薄雾的晨曦中轻轻拥着Lizzie，当张静初躺在屋顶上仰望蔚蓝天空中掠过的飞机，我就相信，你在，你一定会在。",
"幻象中批驳实在，异色中解构灰蓝；尘世中的的艳与寂，归与离，随流光掠过，随来去无碍，云衣淡卷，此心悠然。前世佳缘，遗留印记，只因期待今生与你重逢在这轮回的宿命中。",
"这是一棵充塞宇宙的大树，无边无际。星星是它的果实，可它的树干在哪里？向西行去攀那根天柱，也许它这棵大树的树干？我想你一定能攀上这棵大树，安坐枝杈间饕餮蜜桃。你如同西部璀璨的星空，长久地闪亮我心底，我常在梦中回返，像从浊世重登天堂。",
"人生的浮云总会遮断望眼，荆棘总会绊住双脚，斗志总会被曲折消磨，我早已在这个熟悉的城市遗失了一颗感恩的心。却在你出现时重拾，与你一同感恩苍生，感恩大地。",
"你的世界，是我忘记旋律的一首歌；我的寂寞，却哭不出声响。你的苍桑，路遇我的繁华凄凉，我反复吟唱，却成了年华无法停驻的忧伤。",
"上苍把人分成两性就把世界分成了两半，男人无法明白女人就和女人无法明白男人一样顺应天理。但我想靠近你，认识你，爱上你，像研究一枚娇艳的花朵般诠释你，歌唱你。",
"刘德华和阿汤哥那种才貌双全的郎君是不会来交你的友的。当然我也没做诺丁山的梦，您要真是一仙女我也接不住。明白这点，我们以结婚为目的，生子为总目标的恋爱就可以开始了。",
"人生就像舞台一样，演义出形形色色的人生，每个人都有它理想的人生，同样也有它理想伴侣，为此，我们我们努力地奋斗着，努力地寻找着，通过自己的努力来实现自己的目标，通过自己一颗真诚心，打动她，来到她的身旁，一起走过这段人生的历程，来一起分享生活的酸甜苦涩。",
"不知道是什么奇异的风，将我的一滴眼泪吹落入污浊的灰土，却没有一丝要闯进眼泪。身体在身边静静地聆听，它倾听到眼泪心底的抽搐，一波波微跳的颤栗似孤独的草原上一颗石子，显得寂寞。这样的我期待你掀起我的心灵，细心阅读。",
"来到这里是个偶然，遇见你也许也是偶然，我们都不知道下一颗巧克力的味道，无数个偶然或许就是生活送给我们最美的礼物，你的偶然出现或许就是我生命中最美的必然。",
"上天也许早已安排我们遇见，指引我历尽千山万水来到你身边，在我们终于遇见心仪的人时，便应当心存感激。我在这里等着一份缘定的爱情，等着你的到来。"];

var fmale =["对整个世界来说，你是一个人，而对一个人来说，你就是整个世界。我会在这里等着你的到来，期待我们的爱情开花结果，期待把我们的小窝布置得浪漫温馨，一回到家就有幸福的感觉。",
"如果你花心，请别近入我的花园。如果你假意，请别进入我的世界。如果我们的文字能会意，那么请珍惜缘分。如果你能读懂我的内心世界，我会恋上你，为你，我什么都愿意。",
"有时候望着地平线的方向，我在想，自己一路走来，明天又将去向哪里呢。快乐过也失落过，一个人旅途太漫长，如果你愿意，我希望能拉着你的手，一起奔跑，一起去寻找我们的幸福。",
"一杯清茶，一本小说，一张碟片还有一首老歌。我们生来时，什么也没有带来，同样的死后也带不走什么。所以,亲爱的，我们简简单单过完这辈子，然后把这份感情留到下辈子好不好？",
"关于金钱，不要求你有金山银山，够花就行。关于房子，我想你总要给我一个能遮风挡雨的小窝，和你一副宽阔的肩膀叫我依靠。我愿与你一同走在看见高山的雄伟，经历大海的宽阔。",
"也许我很平凡，但是我绝不缺乏生活的热情和生命的梦想，也许我会孤单，但是我会一路找寻你的踪迹。遇见你，将是我生命中最绚烂的时刻。",
"天空飘着云还有梦，看冬天的雪越来越远，咫尺天涯，一个温柔善良的女人，能等到你的到来吗？能否能给我个温暖的怀抱，让我飘泊的心灵能寻找到家。以后的岁月，我愿长伴你左右，风雨共度。与你相亲相爱、相依相守。",
"我是烟，谁能将我的心事读懂？今生种种皆是前生因果，你我的相遇又是前生怎样的缘分。我想我的你可以与我一直不说话也不会觉得尴尬、只是幸福着的感受着。",
"一个人走得久了，会累，有个人，陪你在冬日的午后晒太阳，为你递上一杯热气腾腾的绿茶，和心爱的人慢慢变老，还有什么比这更幸福呢？",
"这个世界上，总有一个人在等你，总有一个人会给你安心的幸福，总有一个人会陪你到老，这个人，要珍惜，要感恩。你是我要找的幸福吗？",
"也许我很平凡，但是我绝不缺乏生活的热情和生命的梦想，也许我会孤单，但是我会一路找寻你的踪迹。遇见你，将是我生命中最绚烂的时刻，我想留下来被你生活。",
"是我没有遇见缘分，还是没有遇见你，无论外面的世界如何纷繁复杂，只想和你过一种简单的生活，相濡以沫，白头到老。",
"你认识我时，我不认识你，你喜欢我时，我认识你，你爱上我时，我喜欢你，不想在你离开我时，我才爱上你。所以请珍惜缘分，相信它就是这样让我们遇见。",
"当爱不能完美，我宁愿选择无悔，不管来生多么美丽，我不愿失去今生对你的记忆，我不求天长地久的美景，我只要生生世世的轮回里有你。",
"快乐要有悲伤作陪，雨过应该就有天晴。如果雨后还是雨，如果忧伤之后还是忧伤，请让我们从容面对这离别之后的离别。微笑地去寻找一个下一个出现的你。",
"我爱你是我的自己的事，所以你也许不知道我的存在。但如果遇见那个你，我希望不只是我爱你，而是在一起。有你的日子，阳光明媚，没你的日子，人生灰暗。",
"这一辈子，我需要的不多，一碗饭一杯茶而已，但是我希望饭是你做的，茶是你泡的。阳光明媚，鸟语花香，都是每个有你的日子才会有的童话。",
"快乐的日子，总是令人期待。美好的踪影，正在不远的地方，轻轻召唤，我从千里之外，遍寻你的足迹，只为了合上你的节拍，与你共度此生。",
"于千万人之中遇见你所要遇见的人，于千万年之中，时间的无涯的于千万人之中遇见你所要遇见的人，于千万年之中，时间的无涯的荒野里，没有早一步，也没有晚一步，刚巧赶上了，那也没有别的话可说，惟有轻轻地问一声：“噢，你也在这里。”",
"曾有人说：前世五百次的回眸，才换来今生的一次擦肩而过。那个将和我牵手一起走过的人，一定是前世与我许下了今生的约定，我在寻觅你，寻觅你伟岸的背影和坚实的背脊，你呢？",
"如果让我在这里遇见你，会不会是个奇迹呢，曾经无数次幻想过未来另一半的样子，朦胧而亲切，找寻至今，我才相信，爱情终究是缘分，茫茫人海两个人的相识相爱，本身就是一种巧合，你会是我的那个巧合吗？",
"那些等待化了思念，说不清楚已经累积了多少。从桃花开，到李花落。只记得今早的鹊儿报了喜讯。不是那熟悉的清湖畔， 不是那绿油油的稻田旁。不是坐在机杼前。也不是站在柴门前翘首以望等你归来。",
"一个细微动作，一个飘忽眼神，抑或是一个转身的距离，相爱的人应该有着缘分的默契，找一个爱我懂我的人，与他一起漫步，与他一起读诗，共享人世繁华。",
"这一生，牵她的手爱了，就要牢牢地，牢牢地靠近，不要在茫茫人海中丢失了彼此。还是，你是你，我是我，互不相欠，各奔幸福。",
"我在等一个人，一个愿意走进我的生命分享我的喜怒哀乐的人，一个知道我曾经无尽的等待因而更加珍惜我的人，一个也许没能参与我的昨天却愿意和我携手走过每一个明天的人， 一个知道我不完美却依然喜欢我甚至连我的不完美也一并欣赏的人!",
"爱我，要爱我一生一世；爱我，爱，只且爱我一个；爱我，必须爱我的一切缺点；爱我，必须懂我；我爱看小说，你可以不爱；我爱猜谜语，你必须配合，哪怕你不会；我爱猜谜语，如果你会，你要装不会，但是最后要会。",
"也许世界很复杂，但我希望生活简单化，单纯化。 世界无完美的人，完美的人也看不上不完美的我。 所以，我将世界中纷繁复杂的品行在乱序中粗粗勾画，形成我所追求的那个他。 善良、包容、 才华、 幽默、 能看顺眼的外貌，以上五点的前提——相信这个世界有真爱。",
"憧憬中国传统的婚姻人生：一夫一妻，同甘共苦，白头到老，老爷爷老奶奶，直到生命终了！年华岁月，悄悄而逝，您我雷同，人生洗礼，渐渐长大！风吹雨打，脚步坚定，自尊自强谦卑中又自信！",
"首先为你鼓掌，我想说： 你这么有眼光 ，小女子佩服佩服 ！嘿嘿， 因为在这么多佳人之中你正选择了我，这是你一生的运气，一世的才气，一辈子的福气。",
"一个人的天空很蓝，蓝的有点忧郁。一个人的日子自由，自由的有点孤单；一个人的日子，背影多了份孤独，身边少了份快乐；一个人的日子，心灵多了份宁静，面容添了一丝忧郁……有人心疼我的那一份孤独，有人羡慕我的那一份宁静……而我，总是一个人在等待你的出现。"];

var mtab=["文质彬彬","阳光帅气","忠厚老实","幽默风趣","低调内敛","睿智精明","成熟稳重","孩子气","时尚先锋","才高八斗"];
var ftab=["睿智高雅","成熟大气","活泼开朗","清纯可爱","古灵精怪","秀外慧中","知性才女","冰雪聪明","乖乖女","时尚酵母"];

var ftab_items=[["我是不是能幸运地遇见属于这么一个人，懂且真正属于我。抛却属于我的所有光环，他看到真正的我，他永远不会放弃我。会不会有一天，我会等到这样的人。他说他不要世界，他说我只爱你。",
"爱的最高境界是习惯。我想习惯一个男人的鼾声，从不适应到习惯再到没有他的鼾声就睡不着觉；我想让一个男人习惯我，我的任性、撒娇，甚至无理取闹……在我眼中，如果一个人会为了另一个人去改变，去迁就这便是最好的爱情。",
"不想自己的爱情太脆弱，不想它被种种欲望冲击得失去方向和安全感的心。我若爱你，不会因为你的职位高低、尊卑、贵贱，忘记了存在内心深处的感觉。爱情，从来都只是两颗心的事，我愿放下理智，等待你的靠近。"],
["其实对方不喜欢你，你再怎么追也没用，对方喜欢你，根本不需要挖空心思去追。或许真有一天他被你的诚意所打动，可最终大多还是会分手的。每个人都有一个死角，把最深沉的秘密放在那里。你懂了，自然会爱我。",
"很多人问，某星座和某星座配吗？究竟哪个星座与我最相配……其实我一直想说：只有不相配的人，没有不相配的星座。真的爱，就勇敢的去面对性格的差异，并解决双方的摩擦，而不是逃避和沮丧。你要相信：你的爱需要你来守护！",
"我想要一份纯粹的爱情，很难。放不下骄傲，放不下身段，参杂太多人太多事，彼此撑着，最后以“爱不起”、“不适合”收场。陪我们走到最后的人，也许算不上是我们最爱的，但会是最合适的。这样也很好，不是吗？人生本不完美，也许懂得知足。"],
["找一个会在钱包里放我照片的男人，敢让我咬在身上留印记的男人，敢在微博博客写我的男人，敢让我知道他一切的男人，就算在我任性说分手的时候也不会抛下我，会紧紧拥抱我不让我走的男人，敢对我一生负责任并且好好对我的男人。这里有这样的男人吗? 我在找你。",
"我深深相信，会有那么一个人用尽全力爱上我的全部。我的哭，我的笑，我的任性，我的温柔，我的依赖，我的自私，我的天真，我的粗心，我的疯狂，我的安静，还有我同样用尽全力爱上你的全部的那颗心。",
"真想把“爱情“抓到面前来，揪住它的衣领恶狠狠的对它说，我明明拼了命的为你努力过，可是爱情啊爱情，为什么你就还不出现?你是否像我一样，曾这样吶喊着？来到这里，我真渴望有一场人生的奇遇，邂逅你，一辈子走下去。"],
["她敏感，她爱吃醋，她爱耍小脾气，她爱听甜言蜜语，她会在独处的时候瞎想，。她没有理由地哭和难过，一个人抱着腿坐在床上默默看着一个地方。 “这是谁呀？”这就是我。你能接受这样一个我吗？",
"期待找到这么个人：一上线就会去看他在不在,不在就一阵失落, 在,又不敢打扰!期待有这么个人,他的状态只要一换,我立刻就胡思乱想 揣测不安!忍不住去看他的情感博客!即使他什么新鲜事都没有!我很想为他而活，而他一直没有出现！",
"好想有个人，在我难过的时候，能把他的肩膀借给我；好想有个人，在我每次痛哭流涕时，给我擦鼻涕；好想有个人，在我每次摔倒时抻出双手把我扶起；好想有个人，在我时刻需要的他时候，会出现在我生命里。"],

["如果我是一个没有身材没有样貌的女人；一个入不了厨房出不了厅堂的女人；一个跟不上潮流的女人；一个盲目消费的女人……但却爱你爱到死心塌地。这样的我，你敢不敢要，敢不敢选择我，你敢吗？",
"如果有那么一天，请不要问我为什么喜欢你！因为你可能不够帅，不够多金，没心没肺，有时候还傻傻的，有什么办法呢，我就是凭感觉，喜欢你就没有理由！但我要告诉你，我讨厌的事是，你说你想我，但你却什么都不做。",
"在下雨的时候，我是那个脱掉鞋子，在雨中舞蹈的女孩；在大雪纷飞的时候，我是那个扔掉雨伞的人，伸手等待雪花的人……没有人可以拿走我的自由，在这个世界上，看你二的人很多，陪你二的人很少，请不要让我等你太久。",
"我是非人类研究中心013号外星人，代号古怪小白鼠。来自布里布里星球（非银河系） 作为一名外星人，我的初级理想是每天能吃三顿饭，便便一次，中级理想是：以后有钱了，包养李宁和姚明，让李宁打篮球，让姚明做体操。"],["我想要的未来，有房子住，不用多大，最好窗外有阳光；早晚有酸奶，一天能吃上苹果，有锅给我煮汤，偶尔能逛逛公园，一年能陪爸妈几次；有工作，有本，有单反，有书看，有歌听；朋友偶尔奔过来聚一起，偶尔能到处走走，有这样，就很幸福了。",
"期待为爱人认真地学习烧菜，不断变化口味，只为照顾好他的胃；期待为爱人精心打理衬衫上的每个褶皱，让他感受每天的柔情蜜意……每一个点滴细致的付出，都只为我深信，爱对了人，每天都过情人节。",
"我并不在乎你有没有钱，在乎的是你会不会发奋努力改变现状；我并不在乎与你生活一起会遇到困难，在乎的是你会不会迎难而上；我并不在乎你有多浪漫，在乎的是能不能从生活的点滴中感受到你的爱。"],
["我相信爱情，我不会说“男人没一个好东西”，因为我还没有阅人无数。《圣经》上说：女人是上帝从男人身上取下的一条肋骨做成的。因此，茫茫人海中，总有一个男人爱我就像爱自己的生命一样。因为，我一定是他生命的一部分。",
"有一个人正向我走来，他会带给我最美丽的爱情，我要做的只是在那个人出现之前，好好的照顾自己。我知道这世上有人在等着我，但我不知道他究竟会是谁，所以，我每天都会很快乐。等他来时，我会跟他分享我的快乐。",
"真正的感情是两个人能在最艰苦中相守，即使分开也是一种必然的考验。据研究，人一生会遇到约2920万人，两个人相爱的概率是0.000049，珍惜每一次来之不易的际遇。------- 一生只谈一次恋爱最好，一次就一生。"],
["哭的时候没人哄，我学会了坚强；怕的时候没人陪，我学会了勇敢；烦的时候没人问，我学会了承受；累的时候没人可以依靠，我学会了自立。就这样我找到了自己。世界上，只有一个我，我渴望你的倾听，你的靠近，渴望你用男人的温暖拥抱一个女人的全部。",
"我总是爱逞强，不愿说出我有多么爱你，不肯彻底表露出我有多么需要你。我害怕被拒绝，我的自尊总是挡住了我的口。如果你猜到我心意，就给我个肩膀，让我靠着别推开，让我释怀。",
"对于世界而言，你只是芸芸众生中的一人；但是对于我而言，未来的你却会是我的整个世界；期待在这里遇见你，因为，我们将开启崭新的美丽世界。"],
["我常常怀疑自己，明明条件不差，为什么偏偏没有另一半，而那些看起来似乎不如我的女孩，反而拥有令人羡慕的感情,为什么呢？我想是因为我太小心，太谨慎了吧？为了所谓的矜持与害怕，选择等待、选择错过。这一次，我想如果你出现，我会勇敢一次。",
"我想有这么一个男人，他不一定很高很帅，但是会让我把以后的时光放心的交给他；他不一定很有钱，但是会让我每天回家后吃上热热的饭菜；他不一定会很早计划好我们的未来，但是会在某天深情的对我说，我最爱的丫头，我们是时候该有个家了。",
"希望，有一份不沉闷的工作，在不是很老的年纪，遇见一个不难看的人，谈一场不慌不忙的恋爱，有一个不吵不闹的婚礼，生一个可爱的宝宝，平平安安的，度过我不算糟糕的一生……"],
["喜欢一个人是种感觉，不喜欢一个人却是事实。事实容易解释，感觉却难以言喻。爱情中我相信感觉，如果他出现，我会第一时间抽他两巴掌，要问问，这些年，你死哪里去了，为什么不早出现……然后抱着他痛哭一场。",
"平时总是嘻嘻哈哈，什么都无所谓，可是转过头去，笑容里分明有几分无奈；电话那头千咛万嘱，回答的总是“我很好”；一个人呆着，莫名其妙的开始发呆；这个矛盾的我，你能接受吗？",
"我，就是我。我不温柔、我脾气不好、我容易吃醋、我容易心痛、我容易胡思乱想、我很任性、我生气时不想说话、我开心了会一直傻笑、我受委屈会放在心里------我就是我，如果受不了，就别走进我的世界。"]
];
var mtab_items =[["我想找一个女人来爱，不伤害她，伤心的时候，好好陪着她，心疼她。女人本来就是用来爱的，她青春短暂，若为我如付出的是一生的代价，也值得我用一生好好回报。",
"想找到这样一个人：在一起的时候，时间不够用，不在一起的时候，时间用不完。在一起的时候，有说不完的话题，可不在一起的时候，却懒的说半句话。在一起的时候，表情多的不够用，可是不跟他在一起的时候，表情通常只有一种：想念......",
"爱情从相遇、相识到相知，每个经历过的点滴都是难忘的回忆。我期待的爱情，会慢慢升华到我们平常口中的亲情，也许那是爱情的力量和最高的升华，如果让我遇上你，我会让你明白，你是我生命中最重要的决定。"],
["每一天都为你心跳，每一刻都被你感动，每一秒都为你担心，这种感觉一定非常好。我期待你的到来，期待世界因为你的存在而变的美丽，期待生命的辉煌因为你的加入而变的更加绚丽多彩！",
"星空下的我，对着流星默默许愿，愿来到世纪佳缘的我，邂逅一世的佳缘，愿我们心中爱情的梦想浪漫重叠，愿天下有情人在月老的指引下，白头偕老，共度一生。",
"一生就这么一次，谈一场以结婚为目的的恋爱吧。不再因为任性而不肯低头，不再因为固执而轻言分手。最后地坚信一次，一直走，就可以到白头。惟愿这一生，执子之手，与子偕老。——你敢天长，我就敢地久。"],
["在遇到你之前，我现在还只是个孩子，从来没有想过和一个人相守一辈子，会是什么样子。希望你赶快出现在我的生命里，用你的方式打开一个崭新的世界，因为你，因为我们的爱情，因为我们的家庭，我会努力成长，成为一个好男人。",
"如果我爱你，一定没有什么目的。只是爱你。那意味着我想给你全世界。意味着遍体鳞伤也没关系。哪怕用尽所有的勇敢。这一次，可以什么都不在乎。但只是这一次就够了。因为生命再也承受不起这么重的爱情。不管值不值，我会选择真实爱一次。",
"就算忙碌，就算焦虑，也要在空闲之余说一声我想你；就算疲惫，就算郁闷，也要在临睡的时候道一声晚安；就算生气，就算吵架，也要在第二天阳光依稀的早晨眯眼微笑；就算无趣，就算平淡，也要在黄昏的街道上坚定地握着彼此的手。我们约定，一辈子就已足够。"],

["超人变身之前有个身份叫克拉克；狼人变身之前有个身份叫大卫；所有好爸爸的前身，好老公的前身，都是一个郁闷的光棍。所有变化的答案都在一个完美的女人身上。那个改变我的女人，在哪？是你吗？",
"命里总有一个人是为了折磨你而来到这个世上。你再不出现，我10在受不了啦，我想你很9 啦，天天都想见你啦，你 8自己交给我吧，我绝不会再 7负你啦，让你永远 6在我身边嘛， 5爱你爱到 4啦，绝不会再 3心 2意啦，我发誓这辈子就只养你 1只小猪啦！",
"只限女生：优惠大酬宾。陪逛街、陪吃饭、配看电影、陪去聚会，配合拉手，接吻，拥抱……注意：请非诚勿扰，谢谢合作！",
"我觉得谈钱不伤感情，谈感情很是伤钱。没钱就算了，人家还有的是背景，而我只有背影。没钱没势我也不怕，因为这世上有心的无力，有力的无钱，有钱的无情，有情的无缘，有缘的无份，没一个完美的。但我有一样就是理想，肉的理想，白菜的命。",
"鲜花总是插在牛粪上滴，我愿意做你这朵鲜花下的牛粪，给你温暖、呵护、滋养和光彩！！！本人这一坨牛粪也算得到充分利用，达到最高效益。",
"上个世纪中国制造，采用人工智能，各部分零件齐全，运转稳定 ，经多年属质量信得过产品。该“产品”手续齐全，无限期包退包换。现因发展需要，诚招志同道合者，共同研制开发。"],
["爱情，就像海里的沙，只有你用心去呵护它，用泪和心血去滋润它，让它沉醉于心才能成为一颗珍珠。我期待，生命中最重要的宝贝在世纪佳缘出现，和我一起完成寻找梦想的过程。",
"我知道，生活不是童话，所以我不求童话般的结局，只希望拥有一个不完美但却真实的爱情故事。故事的主角：我和你。能在平凡中感受对方的心跳，就是最大的满足。",
"轻轻地，一片落叶飘进我的心里，占满了我全部的心。慢慢地，我的心随落叶飘去，感受到自在的美好。期待平凡的你和我经营一份平凡的爱情，看在眼里，捧在手心，记在脑中，留在心头。一起学会懂得什么是真正的爱情。"],["我喜欢你，你可以一点都不漂亮。我会拉着你的手，骄傲的在朋友们面前介绍。因为你的外表，并不重要。我喜欢你，可以纵容你的一切。但前提是你要值得我喜欢。叫声老婆很容易，叫声太太也不难，但是叫声老太婆，却是一生的承诺！",
"每个人都有一些缺点，没有人真正的完美。所以我会抱着爱情的平常心走近你。在一起时就努力珍惜这些美好的时光，既然得到了就不再左顾右盼。我相信，真诚地对待爱情，那么爱情将同样对我。",
"在爱情上，我实际上是浪漫到无可救药的人。但我也明白相爱容易相处难。两个人在一起不只是相爱那么简单，应该互相体谅、互相了解。倘若对方都猜不透对方。那么这样的爱情也不会甜美！我期待我们两情相悦，相濡以沫更相敬相守。期待你的出现。"],
["我眼中，真正的感情根本不需要追的。而是两个人的默契慢慢将两颗心的距离缩短，在无意识中渐渐靠近彼此。同节奏的爱情往往能奏出最和谐最动听的乐章。其他都不重要，只要两个人在一起轻松快乐而没有压力。你是我的那个她吗？",
"我喜欢一首歌，不是因为它的旋律多么优美动听，而是哀伤在听歌时的心情。我爱上一个人，也并不是因为他有多么完美，而是爱上了和她在一起的感觉。这就是我所珍惜的。爱上了，就不后悔，选择了，就义无反顾地走下去。",
"一辈子其实不长。能遇心爱的人，是多么幸运的事。我想紧握着她的手。一辈子只爱一个人，并不丢人。一定会有更优秀的人出现，但一个人不能这么贪心的。一颗心需要去温暖另一颗心，坦诚相待，这样才可以幸福。真正的爱情，要懂得珍惜。"],
["如果你对我好，我就会忍不住想“欺负”你。就像大雄“欺负”宜静，花轮“欺负”小丸子，红太郎“欺负”灰太狼……也许，等你爱上这样的“被欺负”。你会了解，这种温柔地陪伴，正好是我们在寻找的爱情！",
"我对旁人外冷内热，对友人热心忠诚，对情人更是热血沸腾。我热爱自由，讨厌任何形式的束缚，但拒绝闪电式爱情，喜欢与恋人细水常流地交往，在没确定对方真心之前，总消极被动，一旦确定就全心全意！别说我很好，真的好就别让我逃跑！",
"我想结婚了，那样我们就可以不再对着电话诉说想念，就可以每天清晨起来看见你的睡脸。我想结婚了，那样我们就可以拿着民政局发的红色小本子四处炫耀，可以在房间里挂满结婚照，看着看着就会不自觉的微笑……什么时候找到彼此了，让我们赶快结婚吧？"],
["有人说，“只要你去了普罗旺斯，就不会想离开。因为那里有你想要的东西……”薰衣草，花语为“等待爱情。”真的好美！！这样一个地方，你也开始向往了吧！和我心爱的女孩一起去赴薰衣草之约，你是那个女孩吗？",
"看到大街上情侣的身影，莫名会羡慕。一副满不在乎的样子从他们身边走过，不屑的自言自语“干嘛这么亲热不就是热恋吗”走几步心里突然就这么空落落的……曾经我也是一个巴不得全世界都知道我幸福的人，如果上天给我一次机会，我很想对你说，让我们恋爱吧！",
"单身多年，真怀疑上帝在随机配发，而月老老眼昏花。穿梭于大街，茫茫人海，大海捞针，街上凡是长的像我老婆的，我都挤上去多看几眼。我也很累。我不跟人比早，只比以后的幸福有多少。放心，早晚有一天，我会从人堆里，把她捉出来！"],
["传说鱼的记忆只有七秒，我多想成为一个鱼人，身体一半是鱼、一半是人，用鱼的记忆来忘记过往不开心的事情，而用人的记忆来记取即将到来的和你快乐、美好的瞬间。如果爱情，能这样，请许我，地久天长！",
"柏拉图说，当爱情轻敲肩膀时，连平日对诗情画意都不屑一顾的男人，都会变成诗人。就像在爱人的眼中，ABCDEFG绝不仅仅是字母，而是“A boy can do everything for girl.”。",
"我是个“狠心”的人，一年365天我只想你4天，〈那是春天、夏天、秋天、冬天〉；我的爱很少，一年中我只爱你3天，〈那是昨天、今天、明天〉；若你问我喜欢什么？我会说喜欢看你的眼睛，因为里面有我幸福的微笑。如果你要送我礼物，我只要你上衣的第二颗纽扣，因为那是靠近你心脏最近的地方。"]
] ;

   var args ={cache:true,
	          src :"http://images1.jyimg.com/w4",
	          top : 100,
	          css:'nxdb_a',
	          left: 300,
	          onclose:false,
	          onselect:false,
	          onopen:false,
	          onrender:false,
	          model:true
             } ;
   var cache ={
       m :false,
	   f :false,
	  data:{}
   }
	$.fn.Note = function(id,options)
	{
       $("#"+id).empty();
       
	   $("#"+id).append(note_html).css("height","1").css({"position":"absolute","height":1,top:0,left:0,zIndex:1000});

       var p =$.extend({},args,options);
       if(p["model"] == true)
	   {
		   var positon = getWinSize();
		   var w =positon[0];
		   var h =positon[1];

		   $("#"+id).append("<div id='note_pop_model' style='display:none; position:absolute;z-index:1;top:-60px;left:-250px;zoom:1;height:"+h+"px; width:"+w+"px;background:#33393C;filter:alpha(opacity=60);opacity:0.4;'><iframe style='display:none;display:block;position:absolute;top:0;left:-30px;z-index:-1;filter:mask();width: "+w+"px;height: "+h+"px;'></iframe></div>");
	   }
	 //看看别人怎么写
        $("."+p["css"]).click(function(){
 
            if($(".layerBorder").is(":visible"))
			{
				return ;
			}
			
            if(typeof p["onopen"] == 'function')
			{
				   p["onopen"]();
			}
            var sex = $(this).attr("sex");
		    $(".layerBorder").show('slow',function(){
			 
			   $(".layerBorder").css("position","absolute");
			   $(".layerBorder").css("zIndex","1000");
			   $(".layerBorder").css("top",p["top"]);
			   $(".layerBorder").css("left",p["left"]);

				if(!$("#note_pop_model").is(":visible"))
				{
					$("#note_pop_model").fadeIn("slow");
				}
				  //加tab
				  //加内容
				   var tab = random(6,0,10);
				   var common = getcommon(sex,p);

				   //tab.unshift("通用型");
				   $("#tags").empty();
				   $("#tagContent").empty();
				   $("#tags").append(" <li class=\"selectTag\"><A class=\"_tag_select\" mess =\"tagContent0\" href=\"javascript:void(0)\">通用型</A> </li>");
                   var ccm;
				   if(sex == "f")
				   {
					   ccm = fmale;
					   ctab= ftab;
					   citem=ftab_items ;
				   }else
				   {
					   ccm = male;
					   ctab=mtab;
					   citem=mtab_items
				   }
				   //通用型
                   $("#tagContent").append('<div class="tagContent selectTag" id="tagContent0"><div class="dubaiList"><ul></ul></div></div>');
				   var ci =1 ;
				   for (var i =0;i<common["cc"].length ;i++ )
				   {
				         $("#tagContent #tagContent0 ul").append('<li><div class="dubaiListText">'+ci+'、'+fm[common["cc"][i]]+'</div>'+
                        '<div class="dubaiListBotton"><a class="user_this_note"  tab="0" index="'+ci+'" href="javascript:void(0)"><img src="'+p["src"]+'/register/i/tayong.gif"></a></div>'+
                        '<div class="clear_ling"></div>'+
                        '</li>');
						 ci++;
				   }

				   for (var i =0;i<common["cc2"].length ;i++ )
				   {
				         $("#tagContent #tagContent0 ul").append('<li><div class="dubaiListText">'+ci+'、'+ccm[common["cc2"][i]]+'</div>'+
                        '<div class="dubaiListBotton"><a class="user_this_note"  tab="0" index="'+ci+'" href="javascript:void(0)"><img src="'+p["src"]+'/register/i/tayong.gif"></a></div>'+
                        '<div class="clear_ling"></div>'+
                        '</li>');
						 ci++;
				   }
				  //通用型 end
				   var index =0;
				   var tab = common["tab"] ;
				  for(var i=0 ;i<tab.length;i++)
				  {
				     
				      index = i+1 ;
                      $("#tagContent").append('<div class="tagContent" id="tagContent'+index+'"><div class="dubaiList"><ul></ul></div></div>');
					  $("#tags").append("<li><A  class=\"_tag_select\" mess =\"tagContent"+index+"\" href=\"javascript:void(0)\">"+ctab[tab[i]]+"</A> </li>");
					  var items = citem[tab[i]] ;
					  var index2 =1;
					  for(var j=0 ;j<items.length;j++)
					  {
					     $("#tagContent #tagContent"+index+" ul").append('<li><div class="dubaiListText">'+index2+"、"+items[j]+'</div>'+
                        '<div class="dubaiListBotton"><a class="user_this_note" tab="'+index+'" index="'+index2+'" href="###"><img src="'+p["src"]+'/register/i/tayong.gif"></a></div>'+
                        '<div class="clear_ling"></div>'+
                        '</li>');
						index2++;
					  }
				  }
              $(".tagContent a").click(function(){

				  var temp =$(this).parent().prev().html().replace(/^\d+、/,"");
				  if(typeof p["onclick"] == "function")
				  {
					 p["onclick"](temp,$(this).attr("tab"),$(this).attr("index"));
				  }
				 $(".layerBorder").hide('slow');
				 $("#note_pop_model").fadeOut("slow");
		     });
			  $("._tag_select").click(function(){
			      
				  var id =$(this).attr("mess");
				  if(id !="")
				  {
					  $.each($("#tags li"),function(){
					  
					    $(this).removeAttr("class");
						return true;
					  });

					  $(this).parent().attr("class","selectTag");
                      // 操作内容
					  $("#"+id).slideDown("slow");
					  for(i=0; i<=6; i++){
						if(id !="tagContent"+i && $("#tagContent"+i).is(":visible"))
						{
                           $("#tagContent"+i).slideUp("slow");
						}
					 }
				  }
			   });
			  	 $(".close").click(function(){
					   $(".layerBorder").hide('slow');
					   $("#note_pop_model").fadeOut("slow");
				});
				$(".tagContent li").mouseover(function(){
					$(this).attr("class","dubaiListSelect");
				}).mouseout(function(){
					$(this).attr("class","");
				});
				if(p["onrender"] !=false && typeof p["onrender"] == "function")
				{
					 p["onrender"]();
				}
			});
		});
	}
	function getcommon(sex,p)
	{
	   if(sex == "f" )
	   {
		   if(cache["f"] == false || p["cache"] != true)
		   {
			   cache["f"] = true;
			   cache["data"]["tab"]= random(6,0,10);
			   //男女通用30 取10
			   cache["data"]["cc"] = random(5,0,30);
			   //女通用30 取 5
			   cache["data"]["cc2"]= random(10,0,30);
		   }
	   }else
	   {
		   if(cache["m"] == false || p["cache"] != true)
		   {
			   cache["m"] = true;
			   cache["data"]["tab"]= random(6,0,10);
			   //男女通用30 取10
			   cache["data"]["cc"] = random(5,0,30);
			   //男通用30 取 5
			   cache["data"]["cc2"]= random(10,0,30);
		   }
	   }
	
	  return cache["data"] ;
 }
function in_array(array,index)
{
  var chr = String.fromCharCode(5);
  return (chr + array.join(chr) + chr).indexOf(chr + index + chr) == -1?false:true;
}
function random(num,mini,maxi)
{
   var arr=new Array();   
   var temp; 
     for(var i=0;i<num;)   
     {  
      
        temp= Math.floor(Math.random()*maxi);
        
		if(temp <=maxi && temp>=mini)
		{
			if(in_array(arr,temp))
			{
			   continue;
			}else
			{
			   arr[i]=temp;
			   i++ ;
			}
		}

	 }   
        return arr; 
 }
function getWinSize()
{
	var clientW = document.documentElement.clientWidth || document.body.clientWidth;
    var clientH = document.documentElement.clientHeight || document.body.clientHeight;
	var offsetW = document.documentElement.scrollWidth || document.body.scrollWidth;
	var offsetH = document.documentElement.scrollHeight || document.body.scrollHeight;
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
	
	var bodyW = (offsetW>clientW)?offsetW:clientW;
	var bodyH = (offsetH>clientH)?offsetH:clientH;
    var isOpera = check(/opera/),
	    isIE = !isOpera && check(/msie/),
        isIE7 = isIE && check(/msie 7/),
        isIE8 = isIE && check(/msie 8/),
		isIE9 = isIE && check(/msie 9/),
        isIE6 = isIE && !isIE7 && !isIE8;
    if(isIE6)
	{
       bodyW = bodyW-2;
	}else
	{
       bodyW= bodyW+36;
	}
	bodyW = Math.max(1176,bodyW);
	return [bodyW,bodyH];
}
var ua = navigator.userAgent.toLowerCase();
function check(r)
{
    return r.test(ua);
}
 function mapping(data,index)
 {
     var array = new Array();

	 for(var i=0;i<index.length;i++)
	 {
	     array[array.length]= data[i];
	 }
	 return array;
 }
 $(document).ready(function(){
 
   $(window).resize(function() {
		if($("#note_pop_model").is(":visible"))
		{
			var p =getWinSize();
			$("#note_pop_model").css({"width":p[0],"height":p[1]});
		}
	});

 });
})(jQuery);

